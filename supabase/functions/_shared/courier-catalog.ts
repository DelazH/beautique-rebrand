// Parcel specs per product (used for shipping rate + waybill calculations).
// Kept server-side so clients can't tamper with weights/dimensions.

export type Parcel = {
  description: string;
  length_cm: number;
  width_cm: number;
  height_cm: number;
  weight_kg: number;
  price: number;
};

export const CATALOG: Record<string, Parcel> = {
  "shampoo-500": {
    description: "Deep Cleansing Shampoo 500ml",
    length_cm: 8,
    width_cm: 8,
    height_cm: 22,
    weight_kg: 0.6,
    price: 270,
  },
  "conditioner-500": {
    description: "Nourishing Conditioner 500ml",
    length_cm: 8,
    width_cm: 8,
    height_cm: 22,
    weight_kg: 0.6,
    price: 280,
  },
  "butter-125": {
    description: "Hair Butter 125g",
    length_cm: 8,
    width_cm: 8,
    height_cm: 8,
    weight_kg: 0.25,
    price: 180,
  },
  "oil-200": {
    description: "2-in-1 Hair Growth Treatment Oil 200ml",
    length_cm: 6,
    width_cm: 6,
    height_cm: 18,
    weight_kg: 0.3,
    price: 220,
  },
};

export const COLLECTION_ADDRESS = {
  type: "business",
  company: "KC Beautique",
  street_address: "Toekomsrus",
  local_area: "Toekomsrus",
  city: "Randfontein",
  zone: "Gauteng",
  country: "ZA",
  code: "1759",
};

export const COLLECTION_CONTACT = {
  name: "Kaylah Faaltyn",
  mobile_number: "0815955420",
  email: "Kcbeautique10@gmail.com",
};

export type CartLine = { id: string; quantity: number };

export function buildParcels(items: CartLine[]) {
  const parcels: {
    parcel_description: string;
    submitted_length_cm: number;
    submitted_width_cm: number;
    submitted_height_cm: number;
    submitted_weight_kg: number;
  }[] = [];
  let declaredValue = 0;

  for (const line of items) {
    const spec = CATALOG[line.id];
    if (!spec) throw new Error(`Unknown product: ${line.id}`);
    const qty = Math.max(1, Math.min(50, Math.floor(line.quantity)));
    declaredValue += spec.price * qty;
    for (let i = 0; i < qty; i++) {
      parcels.push({
        parcel_description: spec.description,
        submitted_length_cm: spec.length_cm,
        submitted_width_cm: spec.width_cm,
        submitted_height_cm: spec.height_cm,
        submitted_weight_kg: spec.weight_kg,
      });
    }
  }

  if (parcels.length === 0) throw new Error("Cart is empty");
  return { parcels, declaredValue };
}
