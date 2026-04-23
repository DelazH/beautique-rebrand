import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/kc-logo.jpeg";
import { services, products } from "@/data/site";

const Index = () => {
  return (
    <>
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
            Embrace Your <span className="text-gold italic">Uniqueness</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Experience the artistry of beauty in a tranquil sanctuary where self-care
            meets transformation. Our expert Beauticians are dedicated to enhancing your
            natural beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary-foreground px-10 py-6 text-base tracking-wide"
              asChild
            >
              <Link to="/services">Our Services</Link>
            </Button>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary-foreground px-10 py-6 text-base tracking-wide"
              asChild
            >
              <Link to="/contact">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">OUR EXPERTISE</p>
            <h2 className="font-serif-display text-4xl md:text-5xl text-gold mb-6">
              Premium Beauty Services
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover our comprehensive range of services designed to enhance your
              natural beauty and provide a rejuvenating experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card
                key={s.title}
                className="border-border/60 bg-card shadow-sm hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-8">
                    <div className="h-14 w-14 rounded-full bg-gold/10 flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-gold" />
                    </div>
                    <span className="text-sm text-muted-foreground tracking-wide">Beauty</span>
                  </div>
                  <h3 className="font-serif-display text-2xl mb-4">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">{s.desc}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-gold font-medium tracking-wide hover:gap-3 transition-all"
                  >
                    Book Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products preview */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">OUR COLLECTION</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mb-6">
              Luxury Beauty Products
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Take home the same premium products we use in our salon. Carefully
              selected for exceptional results and quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((p) => (
              <Card
                key={p.title}
                className="overflow-hidden border-border/60 bg-card shadow-sm hover:shadow-xl transition-shadow"
              >
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

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary-foreground px-10"
            >
              <Link to="/shop">Visit the Shop</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section className="bg-secondary/40 py-20">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-serif-display text-3xl md:text-4xl mb-4">
            Ready to feel beautiful?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Book your appointment today and let our Beauticians take care of the rest.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gold hover:bg-gold/90 text-primary-foreground px-10 py-6 text-base tracking-wide"
          >
            <Link to="/contact">Book Appointment</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
