import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, Star, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/kc-logo.jpeg";
import founder from "@/assets/founder-katherine.jpg";
import salon from "@/assets/salon-interior.jpg";
import { services, products } from "@/data/site";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7.01a4.85 4.85 0 0 1-1.84-.32z" />
  </svg>
);

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/kcbeautique", Icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/kcbeautique", Icon: Facebook },
  { name: "TikTok", href: "https://www.tiktok.com/@kcbeautique", Icon: TikTokIcon },
];
import { useCart } from "@/hooks/use-cart";

const values = [
  "Excellence in every service",
  "Personalized approach",
  "Continuous innovation",
  "Sustainable beauty",
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Index = () => {
  const { add } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    toast.success("Thank you! We'll be in touch shortly to confirm your appointment.");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <>
      {/* HERO */}
      <section id="home" className="container py-14 md:py-24 scroll-mt-20">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <img
            src={logo}
            alt="KC Beautique — Beauty sprinkled with compassion"
            className="w-44 md:w-64 h-auto mb-8"
          />
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-6xl leading-[1.15] mb-6">
            Elevate Your <span className="text-gold italic">Beauty</span>,
            <br className="hidden sm:block" />
            Embrace Your <span className="text-gold italic">Uniqueness</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Experience the artistry of beauty in a tranquil sanctuary where self-care
            meets transformation. Our expert Beauticians are dedicated to enhancing your
            natural beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => scrollTo("services")}
              className="bg-gold hover:bg-gold/90 text-primary-foreground px-8 py-6 text-base"
            >
              Our Services
            </Button>
            <Button
              size="lg"
              onClick={() => scrollTo("contact")}
              className="bg-gold hover:bg-gold/90 text-primary-foreground px-8 py-6 text-base"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-secondary/40 py-16 md:py-24 scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">
              OUR EXPERTISE
            </p>
            <h2 className="font-serif-display text-3xl md:text-5xl text-gold mb-5">
              Premium Beauty Services
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Discover our comprehensive range of services designed to enhance your
              natural beauty and provide a rejuvenating experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Card
                key={s.title}
                className="border-border/60 bg-card shadow-sm hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-7">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                      <s.icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="text-sm text-gold font-medium">{s.price}</span>
                  </div>
                  <h3 className="font-serif-display text-xl mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                  <button
                    onClick={() => {
                      setForm((f) => ({ ...f, service: s.title }));
                      scrollTo("contact");
                    }}
                    className="inline-flex items-center gap-2 text-gold font-medium tracking-wide hover:gap-3 transition-all"
                  >
                    Book Now <ArrowRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-16 md:py-24 scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">
              OUR COLLECTION
            </p>
            <h2 className="font-serif-display text-3xl md:text-5xl mb-5">
              Luxury Beauty Products
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Take home the same premium products we use in our salon.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {products.map((p) => (
              <Card
                key={p.id}
                className="overflow-hidden border-border/60 bg-card shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-gold tracking-[0.2em] text-xs font-semibold mb-3 uppercase">
                    {p.category}
                  </p>
                  <h3 className="font-serif-display text-xl md:text-2xl mb-3">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {p.desc}
                  </p>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="font-serif-display text-2xl">R{p.price}</span>
                      <span className="text-muted-foreground text-sm ml-2">
                        / {p.size}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm text-muted-foreground">5.0</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gold hover:bg-gold/90 text-primary-foreground"
                    onClick={() => {
                      add({
                        id: p.id,
                        title: p.title,
                        price: p.price,
                        size: p.size,
                        image: p.image,
                      });
                      toast.success(`${p.title} added to cart`);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* ABOUT */}
      <section id="about" className="bg-secondary/40 py-16 md:py-24 scroll-mt-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={salon}
                alt="KC Beautique salon interior"
                className="w-full h-auto rounded-lg shadow-lg grayscale"
              />
              <div className="absolute -bottom-6 -right-2 md:-right-6 bg-card p-5 md:p-6 rounded-lg shadow-xl border border-border max-w-[16rem]">
                <h3 className="font-serif-display text-xl mb-3 text-gold">
                  Our Values
                </h3>
                <ul className="space-y-2">
                  {values.map((v) => (
                    <li key={v} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" /> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">
                OUR STORY
              </p>
              <h2 className="font-serif-display text-3xl md:text-5xl mb-6 leading-tight">
                Beautifying the World One Client at a Time
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded with a simple vision — to create a sanctuary where beauty,
                  wellness, and self-care converge. KC Beautique has grown from a small
                  boutique into a premier beauty destination.
                </p>
                <p>
                  At KC Beautique, we believe that true beauty emerges when you feel
                  your best inside and out. Our team of skilled Beauticians is dedicated
                  to helping you discover and enhance your natural beauty.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-10 pt-8 border-t border-border">
                <img
                  src={founder}
                  alt="Kaylah Faaltyn, Founder"
                  className="h-16 w-16 rounded-full object-cover border-2 border-gold"
                />
                <div>
                  <p className="font-serif-display text-lg">Kaylah Faaltyn</p>
                  <p className="text-sm text-gold italic">
                    Founder & Creative Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 md:py-24 scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">
              GET IN TOUCH
            </p>
            <h2 className="font-serif-display text-3xl md:text-5xl mb-5">
              Book Your Appointment
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              We're excited to help you look and feel your best.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="md:col-span-2">
              <Card className="border-border/60">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          placeholder="Jane Doe"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="+27 ..."
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service of Interest</Label>
                        <Select
                          value={form.service}
                          onValueChange={(v) => setForm({ ...form, service: v })}
                        >
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s.title} value={s.title}>
                                {s.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us what you'd like to book..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gold hover:bg-gold/90 text-primary-foreground"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@kcbeautique.co.za" },
                { icon: Phone, label: "Phone", value: "+27 00 000 0000" },
                { icon: MapPin, label: "Location", value: "South Africa" },
              ].map((item) => (
                <Card key={item.label} className="border-border/60">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="h-11 w-11 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium break-words">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
