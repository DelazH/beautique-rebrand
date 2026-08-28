import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Minus, Plus, Trash2, Truck, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "27815955420";

type Rate = {
  service_level_code: string;
  service_level_name: string;
  description: string;
  total: number;
  delivery_date_from: string | null;
  delivery_date_to: string | null;
};

const emptyForm = {
  name: "",
  mobile_number: "",
  email: "",
  street_address: "",
  local_area: "",
  city: "",
  postal_code: "",
};

const CartDrawer = () => {
  const { items, count, total, setQuantity, remove, clear } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [rates, setRates] = useState<Rate[] | null>(null);
  const [selected, setSelected] = useState<Rate | null>(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [waybill, setWaybill] = useState<string | null>(null);

  const set = (k: keyof typeof emptyForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "postal_code") {
      setRates(null);
      setSelected(null);
      setWaybill(null);
    }
  };

  const lines = items.map((i) => ({ id: i.id, quantity: i.quantity }));
  const grandTotal = total + (selected?.total ?? 0);

  const getRates = async () => {
    if (!/^\d{4}$/.test(form.postal_code.trim())) {
      toast.error("Enter a valid 4-digit postal code");
      return;
    }
    setLoadingRates(true);
    setRates(null);
    setSelected(null);
    const { data, error } = await supabase.functions.invoke("courier-guy", {
      body: {
        action: "rates",
        items: lines,
        delivery: {
          postal_code: form.postal_code.trim(),
          city: form.city,
          local_area: form.local_area,
          street_address: form.street_address,
        },
      },
    });
    setLoadingRates(false);

    if (error || (data as any)?.error) {
      console.error("Rate lookup failed", error, data);
      toast.error("Couldn't fetch delivery rates. Please check the postal code.");
      return;
    }
    const list = ((data as any)?.rates ?? []) as Rate[];
    if (list.length === 0) {
      toast.error("No delivery options available for that postal code.");
      return;
    }
    setRates(list);
    setSelected(list[0]);
    toast.success("Delivery options loaded");
  };

  const placeOrder = async () => {
    if (!selected) return;
    if (!form.name || !form.mobile_number || !form.street_address || !form.city) {
      toast.error("Please complete your name, phone, street address and city");
      return;
    }
    setPlacing(true);
    const { data, error } = await supabase.functions.invoke("courier-guy", {
      body: {
        action: "waybill",
        items: lines,
        service_level_code: selected.service_level_code,
        contact: {
          name: form.name,
          mobile_number: form.mobile_number,
          email: form.email,
        },
        delivery: {
          postal_code: form.postal_code.trim(),
          street_address: form.street_address,
          local_area: form.local_area || form.city,
          city: form.city,
        },
      },
    });
    setPlacing(false);

    if (error || (data as any)?.error) {
      console.error("Waybill failed", error, data);
      toast.error("Couldn't create the waybill. Please try again.");
      return;
    }

    const wb = (data as any)?.waybill_number ?? (data as any)?.tracking_reference ?? null;
    setWaybill(wb);
    toast.success(wb ? `Waybill created: ${wb}` : "Waybill created");

    const itemsText = items
      .map((i) => `${i.title} (${i.size}) x${i.quantity} - R${i.price * i.quantity}`)
      .join("; ");
    supabase.functions
      .invoke("log-submission", {
        body: {
          type: "order",
          customer: form.name,
          phone: form.mobile_number,
          items: `${itemsText} | Delivery: ${selected.service_level_name} R${selected.total} | Waybill: ${wb ?? "n/a"}`,
          total: grandTotal,
        },
      })
      .catch((err) => console.error("Sheets log failed", err));
  };

  const sendWhatsApp = () => {
    const productNames = items
      .map((i) => (i.quantity > 1 ? `${i.title} ×${i.quantity}` : i.title))
      .join(", ");
    const message = `Hi KC Beautique, I booked '${productNames}'. Please send payment details.
Delivery: ${selected?.service_level_name} — R${selected?.total}
Waybill: ${waybill ?? "pending"}
Ship to: ${form.name}, ${form.street_address}, ${form.local_area || form.city}, ${form.city}, ${form.postal_code}
Total: R${grandTotal}`;

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    toast.success("Opening WhatsApp…");
    clear();
    setForm(emptyForm);
    setRates(null);
    setSelected(null);
    setWaybill(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label={`Cart with ${count} items`}
          className="relative hover:text-gold transition-colors"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-gold text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif-display text-2xl">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              Your cart is empty. Browse our collection below.
            </p>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 border-b border-border pb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 rounded-md object-cover bg-secondary"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium leading-tight">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                      <p className="text-gold font-serif-display text-lg mt-1">
                        R{item.price * item.quantity}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-secondary"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-secondary"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => remove(item.id)}
                          className="ml-auto text-muted-foreground hover:text-destructive"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Truck className="h-4 w-4 text-gold" />
                  Delivery details
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="cg-name" className="text-xs">Full name</Label>
                    <Input id="cg-name" value={form.name} onChange={(e) => set("name", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cg-phone" className="text-xs">Phone</Label>
                    <Input id="cg-phone" inputMode="tel" value={form.mobile_number} onChange={(e) => set("mobile_number", e.target.value)} />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="cg-email" className="text-xs">Email (optional)</Label>
                  <Input id="cg-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="cg-street" className="text-xs">Street address</Label>
                  <Input id="cg-street" value={form.street_address} onChange={(e) => set("street_address", e.target.value)} />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="cg-suburb" className="text-xs">Suburb</Label>
                    <Input id="cg-suburb" value={form.local_area} onChange={(e) => set("local_area", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cg-city" className="text-xs">City</Label>
                    <Input id="cg-city" value={form.city} onChange={(e) => set("city", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cg-code" className="text-xs">Postal code</Label>
                    <Input id="cg-code" inputMode="numeric" maxLength={4} value={form.postal_code} onChange={(e) => set("postal_code", e.target.value)} />
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={getRates} disabled={loadingRates}>
                  {loadingRates ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Calculating…</>
                  ) : (
                    "Calculate delivery"
                  )}
                </Button>

                {rates && (
                  <ul className="space-y-2">
                    {rates.map((r) => (
                      <li key={r.service_level_code}>
                        <button
                          onClick={() => { setSelected(r); setWaybill(null); }}
                          className={`w-full text-left rounded-md border p-3 transition-colors ${
                            selected?.service_level_code === r.service_level_code
                              ? "border-gold bg-gold/5"
                              : "border-border hover:bg-secondary"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium">{r.service_level_name}</span>
                            <span className="text-gold font-serif-display">R{r.total}</span>
                          </div>
                          {r.description && (
                            <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>R{total}</span>
            </div>
            {selected && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery ({selected.service_level_name})</span>
                <span>R{selected.total}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-serif-display text-2xl text-gold">R{grandTotal}</span>
            </div>

            {waybill ? (
              <>
                <p className="text-xs text-muted-foreground">
                  Waybill <span className="text-foreground font-medium">{waybill}</span> created with The Courier Guy.
                </p>
                <Button
                  onClick={sendWhatsApp}
                  size="lg"
                  className="w-full bg-gold hover:bg-gold/90 text-primary-foreground"
                >
                  Send order via WhatsApp
                </Button>
              </>
            ) : (
              <Button
                onClick={placeOrder}
                size="lg"
                disabled={!selected || placing}
                className="w-full bg-gold hover:bg-gold/90 text-primary-foreground"
              >
                {placing ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating waybill…</>
                ) : (
                  "Place order & create waybill"
                )}
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
