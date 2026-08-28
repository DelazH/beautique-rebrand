import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import {
  buildParcels,
  COLLECTION_ADDRESS,
  COLLECTION_CONTACT,
  type CartLine,
} from '../_shared/courier-catalog.ts';

const API_BASE = 'https://api.shiplogic.com/v2';
const API_KEY = Deno.env.get('COURIER_GUY_API_KEY');

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

type Address = {
  street_address?: string;
  local_area?: string;
  city?: string;
  zone?: string;
  postal_code: string;
};

type Payload = {
  action: 'rates' | 'waybill';
  items: CartLine[];
  delivery: Address;
  contact?: { name?: string; mobile_number?: string; email?: string };
  service_level_code?: string;
};

function validate(body: unknown): { ok: true; data: Payload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid body' };
  const b = body as Record<string, unknown>;
  if (b.action !== 'rates' && b.action !== 'waybill') return { ok: false, error: 'action must be "rates" or "waybill"' };
  if (!Array.isArray(b.items) || b.items.length === 0) return { ok: false, error: 'items must be a non-empty array' };
  for (const it of b.items) {
    if (!it || typeof (it as CartLine).id !== 'string' || typeof (it as CartLine).quantity !== 'number') {
      return { ok: false, error: 'each item needs { id: string, quantity: number }' };
    }
  }
  const d = b.delivery as Address | undefined;
  if (!d || typeof d.postal_code !== 'string' || !/^\d{4}$/.test(d.postal_code.trim())) {
    return { ok: false, error: 'delivery.postal_code must be a 4-digit South African postal code' };
  }
  if (b.action === 'waybill') {
    const c = b.contact as Payload['contact'];
    if (!c?.name || !c?.mobile_number) return { ok: false, error: 'contact.name and contact.mobile_number are required' };
    if (typeof b.service_level_code !== 'string' || !b.service_level_code) {
      return { ok: false, error: 'service_level_code is required for a waybill' };
    }
    if (!d.street_address || !d.city) return { ok: false, error: 'delivery.street_address and delivery.city are required' };
  }
  return { ok: true, data: b as Payload };
}

const deliveryAddress = (d: Address) => ({
  type: 'residential',
  street_address: d.street_address ?? '',
  local_area: d.local_area ?? d.city ?? '',
  city: d.city ?? '',
  zone: d.zone ?? '',
  country: 'ZA',
  code: d.postal_code.trim(),
});

async function call(path: string, payload: unknown) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let parsed: unknown = text;
  try {
    parsed = JSON.parse(text);
  } catch { /* keep raw text */ }
  return { ok: res.ok, status: res.status, data: parsed };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!API_KEY) return json({ error: 'Courier Guy API key is not configured' }, 500);

    const parsed = validate(await req.json().catch(() => null));
    if (!parsed.ok) return json({ error: parsed.error }, 400);
    const { action, items, delivery, contact, service_level_code } = parsed.data;

    let parcels, declaredValue;
    try {
      ({ parcels, declaredValue } = buildParcels(items));
    } catch (e) {
      return json({ error: (e as Error).message }, 400);
    }

    const base = {
      collection_address: COLLECTION_ADDRESS,
      collection_contact: COLLECTION_CONTACT,
      delivery_address: deliveryAddress(delivery),
      parcels,
      declared_value: declaredValue,
    };

    if (action === 'rates') {
      const r = await call('/rates', base);
      if (!r.ok) return json({ error: 'Rate lookup failed', details: r.data }, 502);
      const rates = ((r.data as { rates?: unknown[] }).rates ?? []).map((raw) => {
        const rate = raw as Record<string, any>;
        return {
          service_level_code: rate.service_level?.code ?? '',
          service_level_name: rate.service_level?.name ?? '',
          description: rate.service_level?.description ?? '',
          delivery_date_from: rate.service_level?.delivery_date_from ?? null,
          delivery_date_to: rate.service_level?.delivery_date_to ?? null,
          total: Math.round((rate.rate ?? 0) * 100) / 100,
        };
      });
      return json({ rates, parcels: parcels.length, declared_value: declaredValue });
    }

    const r = await call('/shipments', {
      ...base,
      delivery_contact: {
        name: contact!.name,
        mobile_number: contact!.mobile_number,
        email: contact!.email ?? '',
      },
      service_level_code,
      customer_reference: `KCB-${Date.now()}`,
      mute_notifications: false,
    });
    if (!r.ok) return json({ error: 'Waybill creation failed', details: r.data }, 502);

    const s = r.data as Record<string, any>;
    return json({
      ok: true,
      waybill_number: s.short_tracking_reference ?? s.tracking_reference ?? null,
      tracking_reference: s.tracking_reference ?? null,
      shipment_id: s.id ?? null,
      rate: s.rate ?? null,
      estimated_collection: s.estimated_collection ?? null,
      estimated_delivery_from: s.estimated_delivery_from ?? null,
      estimated_delivery_to: s.estimated_delivery_to ?? null,
    });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
