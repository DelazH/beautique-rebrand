import { Scissors, Sparkles, Hand } from "lucide-react";
import productOil from "@/assets/product-hair-oil.jpeg";
import productFood from "@/assets/product-hair-food.jpeg";

export const services = [
  {
    icon: Scissors,
    title: "Hair Styling",
    desc: "From classic cuts to trendy styles, our expert stylists craft the perfect look to enhance your natural beauty.",
  },
  {
    icon: Sparkles,
    title: "Makeup Application",
    desc: "Professional makeup services for any occasion, from natural day looks to glamorous evening transformations.",
  },
  {
    icon: Hand,
    title: "Nailcare",
    desc: "Treat yourself to our premium manicure and pedicure services, featuring high-quality polishes and relaxing care.",
  },
];

export const products = [
  {
    image: productOil,
    category: "Hair Care",
    title: "2-in-1 Hair Growth Treatment Oil",
    price: "R200",
    size: "200ml",
    desc: "An intensive treatment oil that revitalizes the scalp, encourages growth, and leaves hair soft, strong, and radiant.",
  },
  {
    image: productFood,
    category: "Hair Care",
    title: "Hair Food",
    price: "R150",
    size: "125ml",
    desc: "Shea Butter & Coconut Oil treatment to nourish and protect hair.",
  },
];
