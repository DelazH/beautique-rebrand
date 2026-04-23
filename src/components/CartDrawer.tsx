import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, count, total, setQuantity, remove, clear } = useCart();

  const checkout = () => {
    toast.success("Order received! We'll WhatsApp you to confirm payment & delivery.");
    clear();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label={`Cart with ${count} items`}
          className="relative hover:text-gold transition-colors"
        >
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-gold text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif-display text-2xl">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              Your cart is empty. Browse our collection below.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 border-b border-border pb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-md object-cover bg-secondary"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium leading-tight">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.size}</p>
                    <p className="text-gold font-serif-display text-lg mt-1">
                      R{item.price * item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-secondary"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-secondary"
                        aria-label="Increase"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-serif-display text-2xl text-gold">R{total}</span>
            </div>
            <Button
              onClick={checkout}
              size="lg"
              className="w-full bg-gold hover:bg-gold/90 text-primary-foreground"
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
