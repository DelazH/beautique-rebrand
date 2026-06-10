import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SPREADSHEET_ID = '1J8C_ccJ9Hl6MbxsfrbUu5zWn4q1P-iSSLAnnMorCwQQ';
const GATEWAY = 'https://connector-gateway.lovable.dev/google_sheets/v4';

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const GOOGLE_SHEETS_API_KEY = Deno.env.get('GOOGLE_SHEETS_API_KEY');

type Body =
  | { type: 'booking'; name: string; email?: string; phone?: string; service?: string; date?: string; time?: string }
  | { type: 'order'; customer?: string; phone?: string; items: string; total: number }
  | { type: 'contact'; name: string; email?: string; message: string };

function rowFor(body: Body): { sheet: string; row: (string | number)[] } {
  const ts = new Date().toISOString();
  if (body.type === 'booking') {
    return { sheet: 'Bookings', row: [ts, body.name, body.email ?? '', body.phone ?? '', body.service ?? '', body.date ?? '', body.time ?? ''] };
  }
  if (body.type === 'order') {
    return { sheet: 'Orders', row: [ts, body.customer ?? '', body.phone ?? '', body.items, body.total] };
  }
  return { sheet: 'Contacts', row: [ts, body.name, body.email ?? '', body.message] };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
      return new Response(JSON.stringify({ error: 'Missing gateway credentials' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as Body;
    if (!body || !('type' in body)) {
      return new Response(JSON.stringify({ error: 'Invalid body' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { sheet, row } = rowFor(body);
    const url = `${GATEWAY}/spreadsheets/${SPREADSHEET_ID}/values/${sheet}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': GOOGLE_SHEETS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    });

    const text = await res.text();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Sheets append failed', status: res.status, body: text }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
