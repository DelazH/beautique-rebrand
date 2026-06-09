import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Star, Mail, Phone, MapPin, Instagram, Facebook, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import logo from "@/assets/kc-logo.jpeg";
import founder from "@/assets/founder-katherine.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import work7 from "@/assets/work-7.jpg";
import { services, products } from "@/data/site";

const workGallery = [
  { src: work1, alt: "Black & gold nail art" },
  { src: work2, alt: "Black & white nail art" },
  { src: work3, alt: "Bridal makeup transformation" },
  { src: work4, alt: "Glam makeup & locs styling" },
  { src: work5, alt: "Sleek high ponytail" },
  { src: work6, alt: "Stitch braids" },
  { src: work7, alt: "Knotless braids" },
];

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7.01a4.85 4.85 0 0 1-1.84-.32z" />
  </svg>
);

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/_kc_beautique_", Icon: Instagram },
  { name: "Facebook", href: "https://www.facebook.com/share/1ChxSdkaNs/", Icon: Facebook },
  { name: "TikTok", href: "https://www.tiktok.com/@kc_beautique_", Icon: TikTokIcon },
];

const WHATSAPP_NUMBER = "27815955420";

const hours = [
  { day: "Monday", status: "Open" },
  { day: "Tuesday", status: "Closed" },
  { day: "Wednesday", status: "Open" },
  { day: "Thursday", status: "Open" },
  { day: "Friday", status: "Open" },
  { day: "Saturday", status: "Open" },
  { day: "Sunday", status: "Closed" },
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
    time: "",
    message: "",
  });
  const [date, setDate] = useState<Date | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast.error("Please fill in your name and message.");
      return;
    }
    const lines = [
      `*New Booking Request — KC Beautique*`,
      `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.service && `Service: ${form.service}`,
      date && `Date: ${format(date, "EEEE, d MMMM yyyy")}`,
      form.time && `Time: ${form.time}`,
      ``,
      form.message,
    ].filter(Boolean);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp to send your booking…");
    setForm({ name: "", email: "", phone: "", service: "", time: "", message: "" });
    setDate(undefined);
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
            {services.map((s, i) => {
              const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hi KC Beautique, I'd like to book a *${s.title}* appointment. Please share availability.`
              )}`;
              return (
                <a
                  key={s.title}
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ animationDelay: `${i * 120}ms` }}
                  className="group block animate-fade-in"
                >
                  <Card className="relative overflow-hidden border-border/60 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-gold/40 h-full">
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/5 via-transparent to-gold/10" />
                    <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <CardContent className="relative p-7">
                      <div className="mb-6">
                        <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[8deg]">
                          <s.icon className="h-5 w-5 text-gold" />
                        </div>
                      </div>
                      <h3 className="font-serif-display text-xl mb-3">{s.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {s.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-gold font-medium tracking-wide transition-all group-hover:gap-3">
                        Book on WhatsApp <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
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
            {products.map((p, i) => (
              <Card
                key={p.id}
                style={{ animationDelay: `${i * 150}ms` }}
                className="group overflow-hidden border-border/60 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-gold/40 animate-fade-in"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    className="w-full bg-gold hover:bg-gold/90 text-primary-foreground transition-transform hover:scale-[1.02]"
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


      {/* OUR WORK CAROUSEL */}
      <section id="work" className="py-16 md:py-24 scroll-mt-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">
              OUR WORK
            </p>
            <h2 className="font-serif-display text-3xl md:text-5xl mb-5">
              A Glimpse of the Glow-Ups
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Real clients, real artistry — straight from the chair.
            </p>
          </div>

          <Carousel
            opts={{ align: "start", loop: true, duration: 60 }}
            plugins={[
              Autoplay({
                delay: 2200,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="max-w-5xl mx-auto"
          >
            <CarouselContent>
              {workGallery.map((img) => (
                <CarouselItem
                  key={img.src}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg bg-secondary shadow-md">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-secondary/40 py-16 md:py-24 scroll-mt-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">
              OUR STORY
            </p>
            <h2 className="font-serif-display text-3xl md:text-5xl mb-6 leading-tight">
              About Us
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Established in 2019, KC Beautique offers premium nail, face, and hair
              services. With a passion for beauty and over 5 years of experience, we
              focus on creating a calm, welcoming space where clients feel relaxed,
              confident, and truly cared for. Our mission is to grow while consistently
              delivering excellence and satisfaction.
            </p>

            <div className="flex items-center justify-center gap-4 mt-10">
              <img
                src={founder}
                alt="Kaylah Faaltyn, Founder"
                className="h-16 w-16 rounded-full object-cover border-2 border-gold"
              />
              <div className="text-left">
                <p className="font-serif-display text-lg">Kaylah Faaltyn</p>
                <p className="text-sm text-gold italic">
                  Founder & Creative Director
                </p>
              </div>
            </div>
          </div>

          <Card className="border-border/60 bg-card max-w-2xl mx-auto">
            <CardContent className="p-7 md:p-9">
              <h3 className="font-serif-display text-2xl mb-5 text-gold text-center">
                Our Core Values
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {values.map((v) => (
                  <li key={v} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-gold shrink-0" />
                    <span className="text-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
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
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Preferred Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              type="button"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(d) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                if (d < today) return true;
                                const day = d.getDay();
                                // Sunday = 0, Tuesday = 2 are closed
                                return day === 0 || day === 2;
                              }}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Preferred Time</Label>
                        <Select
                          value={form.time}
                          onValueChange={(v) => setForm({ ...form, time: v })}
                        >
                          <SelectTrigger id="time">
                            <SelectValue placeholder="Choose a time" />
                          </SelectTrigger>
                          <SelectContent className="max-h-64">
                            {Array.from({ length: 19 }).map((_, i) => {
                              const totalMin = 9 * 60 + i * 30;
                              const h = Math.floor(totalMin / 60);
                              const m = totalMin % 60;
                              const label = `${h.toString().padStart(2, "0")}:${m
                                .toString()
                                .padStart(2, "0")}`;
                              return (
                                <SelectItem key={label} value={label}>
                                  {label}
                                </SelectItem>
                              );
                            })}
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
                      Send via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "Kcbeautique10@gmail.com" },
                { icon: Phone, label: "Phone", value: "081 595 5420" },
                { icon: MapPin, label: "Location", value: "Randfontein, Toekomsrus" },
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

              <Card className="border-border/60">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-3">Follow us</p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map(({ name, href, Icon }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="h-11 w-11 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground mb-3">Opening Hours</p>
                  <ul className="space-y-1.5 text-sm">
                    {hours.map((h) => (
                      <li key={h.day} className="flex items-center justify-between">
                        <span className="text-foreground">{h.day}</span>
                        <span
                          className={
                            h.status === "Open"
                              ? "text-gold font-medium"
                              : "text-muted-foreground"
                          }
                        >
                          {h.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
