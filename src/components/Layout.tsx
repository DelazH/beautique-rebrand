import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Layout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="container flex items-center justify-between py-5">
          <Link
            to="/"
            className="font-serif-display text-2xl md:text-3xl tracking-wide text-foreground"
            onClick={() => setOpen(false)}
          >
            KC Beautique
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-sm tracking-wide font-body transition-colors hover:text-gold",
                    isActive ? "text-gold" : "text-foreground/80"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              aria-label="Shop"
              className="hover:text-gold transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <button
              aria-label="Toggle menu"
              className="md:hidden hover:text-gold transition-colors"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="container flex flex-col py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "py-3 text-base font-body border-b border-border/60 last:border-0 transition-colors",
                      isActive ? "text-gold" : "text-foreground/90 hover:text-gold"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1" key={location.pathname}>
        <Outlet />
      </main>

      <footer className="border-t border-border bg-secondary/30">
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
              {navItems.map((i) => (
                <li key={i.to}>
                  <Link to={i.to} className="hover:text-gold transition-colors">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-serif-display text-lg mb-3">Get in Touch</p>
            <p className="text-muted-foreground">South Africa</p>
            <Link
              to="/contact"
              className="inline-block mt-3 text-gold hover:underline"
            >
              Book an appointment →
            </Link>
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
