import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/CartDrawer";
import { Instagram, Facebook } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "shop", label: "Products" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/_kc_beautique_",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1ChxSdkaNs/",
    icon: Facebook,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@kc_beautique_",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7.01a4.85 4.85 0 0 1-1.84-.32z" />
      </svg>
    ),
  },
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
        <div className="container flex items-center justify-between gap-3 py-3 md:py-4">
          <button
            onClick={() => scrollTo("home")}
            className="font-serif-display text-lg md:text-2xl tracking-wide text-foreground shrink-0"
          >
            KC Beautique
          </button>

          <nav className="flex-1 overflow-x-auto scrollbar-hide">
            <ul className="flex items-center justify-end gap-4 md:gap-7 min-w-max px-1">
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
            <p className="italic text-muted-foreground mb-4">
              Beauty sprinkled with compassion
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground/80 hover:text-gold hover:border-gold transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
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
