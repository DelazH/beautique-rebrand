import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Menu, Scissors, Sparkles, Hand, ArrowRight, Star } from "lucide-react";
import logo from "@/assets/kc-logo.jpeg";
import productOil from "@/assets/product-hair-oil.jpeg";
import productFood from "@/assets/product-hair-food.jpeg";

const services = [
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

const products = [
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between py-5">
          <a href="/" className="font-serif-display text-2xl md:text-3xl tracking-wide text-foreground">
            KC Beautique
          </a>
          <div className="flex items-center gap-5 text-foreground">
            <button aria-label="Cart" className="hover:text-gold transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button aria-label="Menu" className="hover:text-gold transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-16 md:py-28">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <img
            src={logo}
            alt="KC Beautique — Beauty sprinkled with compassion"
            className="w-56 md:w-72 h-auto mb-10"
          />
          <h1 className="font-serif-display text-4xl md:text-6xl leading-[1.1] mb-8">
            Elevate Your <span className="text-gold italic">Beauty</span>,
            <br />
            Embrace Your{" "}
            <span className="text-gold italic">Uniqueness</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Experience the artistry of beauty in a tranquil sanctuary where self-care meets transformation.
            Our expert Beauticians are dedicated to enhancing your natural beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary-foreground px-10 py-6 text-base tracking-wide"
              asChild
            >
              <a href="#services">Our Services</a>
            </Button>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary-foreground px-10 py-6 text-base tracking-wide"
              asChild
            >
              <a href="#book">Book Appointment</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-secondary/40 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">OUR EXPERTISE</p>
            <h2 className="font-serif-display text-4xl md:text-5xl text-gold mb-6">
              Premium Beauty Services
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover our comprehensive range of services designed to enhance your natural beauty
              and provide a rejuvenating experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card key={s.title} className="border-border/60 bg-card shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-14 w-14 rounded-full bg-gold/10 flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-gold" />
                    </div>
                    <span className="text-sm text-muted-foreground tracking-wide">Hair</span>
                  </div>
                  <h3 className="font-serif-display text-2xl mb-4">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">{s.desc}</p>
                  <a
                    href="#book"
                    className="inline-flex items-center gap-2 text-gold font-medium tracking-wide hover:gap-3 transition-all"
                  >
                    Book Now <ArrowRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">OUR COLLECTION</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mb-6">
              Luxury Beauty Products
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Take home the same premium products we use in our salon. Carefully selected for
              exceptional results and quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((p) => (
              <Card key={p.title} className="overflow-hidden border-border/60 bg-card shadow-sm hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-7">
                  <p className="text-gold tracking-[0.2em] text-xs font-semibold mb-3 uppercase">
                    {p.category}
                  </p>
                  <h3 className="font-serif-display text-2xl mb-3">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif-display text-2xl">{p.price}</span>
                      <span className="text-muted-foreground text-sm ml-2">/ {p.size}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm text-muted-foreground">5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="bg-secondary/40 py-20">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-serif-display text-3xl md:text-4xl mb-4">
            Ready to feel beautiful?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Book your appointment today and let our Beauticians take care of the rest.
          </p>
          <Button
            size="lg"
            className="bg-gold hover:bg-gold/90 text-primary-foreground px-10 py-6 text-base tracking-wide"
          >
            Book Appointment
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container text-center text-muted-foreground text-sm">
          <p className="font-serif-display text-base mb-1 text-foreground">KC Beautique</p>
          <p className="italic">Beauty sprinkled with compassion</p>
          <p className="mt-4">© {new Date().getFullYear()} KC Beautique. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
