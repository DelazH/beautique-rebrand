import { Scissors, Sparkles, Hand, Brush, Eye, Flower2 } from "lucide-react";
import productOil from "@/assets/product-hair-oil.jpeg";
import productFood from "@/assets/product-hair-food.jpeg";
import productShampoo from "@/assets/product-shampoo.jpeg";
import productConditioner from "@/assets/product-conditioner.jpeg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

export const services = [
  {
    icon: Scissors,
    title: "Hair Styling",
    desc: "From classic cuts to trendy styles, our expert Beauticians craft the perfect look to enhance your natural beauty.",
    price: "From R350",
  },
  {
    icon: Sparkles,
    title: "Makeup Application",
    desc: "Professional makeup services for any occasion, from natural day looks to glamorous evening transformations.",
    price: "From R450",
  },
  {
    icon: Hand,
    title: "Nailcare",
    desc: "Treat yourself to our premium manicure and pedicure services, featuring high-quality polishes and relaxing care.",
    price: "From R250",
  },
];

export const products = [
  {
    id: "shampoo-500",
    image: productShampoo,
    category: "Hair Care",
    title: "Deep Cleansing Shampoo",
    price: 270,
    size: "500ml",
    desc: "A cleansing shampoo designed to support a healthy scalp, strengthen hair, and leave it feeling clean, soft, and refreshed.",
  },
  {
    id: "conditioner-500",
    image: productConditioner,
    category: "Hair Care",
    title: "Nourishing Conditioner",
    price: 280,
    size: "500ml",
    desc: "A nourishing conditioner that helps moisturize, soften, and strengthen hair while improving manageability and shine.",
  },
  {
    id: "butter-125",
    image: productFood,
    category: "Hair Care",
    title: "Hair Butter",
    price: 180,
    size: "125g",
    desc: "Shea Butter & Coconut Oil treatment to nourish and protect hair.",
  },
  {
    id: "oil-200",
    image: productOil,
    category: "Hair Care",
    title: "2-in-1 Hair Growth Treatment Oil",
    price: 220,
    size: "200ml",
    desc: "An intensive Hot oil treatment & Normal oil treatment that revitalizes the scalp, encourages growth, and leaves hair soft, strong, and radiant.",
  },
];

export const gallery = [gallery1, gallery2, gallery3, gallery4, gallery5];

export const testimonials = [
  {
    name: "Thandi M.",
    role: "Regular Client",
    quote:
      "Kaylah and her team treated me like royalty. My hair has never looked healthier — I won't go anywhere else.",
  },
  {
    name: "Lerato N.",
    role: "Bridal Client",
    quote:
      "My wedding day makeup was flawless from sunrise to last dance. Truly beauty sprinkled with compassion.",
  },
  {
    name: "Aisha K.",
    role: "Skincare Member",
    quote:
      "The facials are pure magic. My skin glows for weeks after every visit. Highly recommended!",
  },
];
