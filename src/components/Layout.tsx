import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/CartDrawer";

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "shop", label: "Shop" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="container flex items-center justify-between gap-4 py-4">
          <button
            onClick={() => scrollTo("home")}
            className="font-serif-display text-xl md:text-2xl tracking-wide text-foreground shrink-0"
          >
            KC Beautique
          </button>

          {/* Horizontal scrollable nav — visible on all screens */}
          <nav className="flex-1 overflow-x-auto scrollbar-hide">
            <ul className="flex items-center justify-end gap-5 md:gap-8 min-w-max px-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className={cn(
                      "text-sm tracking-wide transition-colors whitespace-nowrap hover:text-gold",
                      active === s.id ? "text-gold" : "text-foreground/80"
                    )}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0">
            <CartDrawer />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-secondary/30 mt-12">
        <div className="container py-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif-display text-2xl mb-2">KC Beautique</p>
            <p className="italic text-muted-foreground">
              Beauty sprinkled with compassion
            </p>
          </div>
          <div>
            <p className="font-serif-display text-lg mb-3">Quick Links</p>
            <ul className="space-y-2 text-muted-foreground">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo(s.id)}
                    className="hover:text-gold transition-colors"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-serif-display text-lg mb-3">Get in Touch</p>
            <p className="text-muted-foreground">South Africa</p>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-block mt-3 text-gold hover:underline"
            >
              Book an appointment →
            </button>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} KC Beautique. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
