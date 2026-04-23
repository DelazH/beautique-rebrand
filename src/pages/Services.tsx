import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data/site";

const Services = () => {
  return (
    <section className="container py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">OUR EXPERTISE</p>
        <h1 className="font-serif-display text-4xl md:text-5xl text-gold mb-6">
          Premium Beauty Services
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Discover our comprehensive range of services designed to enhance your natural
          beauty and provide a rejuvenating experience.
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
                <span className="text-sm text-muted-foreground tracking-wide">
                  Beauty
                </span>
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
    </section>
  );
};

export default Services;
