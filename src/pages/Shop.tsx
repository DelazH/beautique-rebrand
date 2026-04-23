import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { products } from "@/data/site";

const Shop = () => {
  return (
    <section className="container py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-gold tracking-[0.3em] text-sm font-medium mb-4">OUR COLLECTION</p>
        <h1 className="font-serif-display text-4xl md:text-5xl mb-6">
          Luxury Beauty Products
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Take home the same premium products we use in our salon. Carefully selected
          for exceptional results and quality.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {products.map((p) => (
          <Card
            key={p.title}
            className="overflow-hidden border-border/60 bg-card shadow-sm hover:shadow-xl transition-shadow"
          >
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-7">
              <p className="text-gold tracking-[0.2em] text-xs font-semibold mb-3 uppercase">
                {p.category}
              </p>
              <h3 className="font-serif-display text-2xl mb-3">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="font-serif-display text-2xl">{p.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">/ {p.size}</span>
                </div>
                <div className="flex items-center gap-1 text-gold">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-muted-foreground">5.0</span>
                </div>
              </div>
              <Button
                className="w-full bg-gold hover:bg-gold/90 text-primary-foreground"
                onClick={() => toast.success(`${p.title} added to cart`)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Shop;
