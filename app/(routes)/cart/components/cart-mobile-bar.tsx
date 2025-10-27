import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";

interface CartMobileBarProps {
  finalTotal: number;
  onCheckout: () => void;
}

export function CartMobileBar({ finalTotal, onCheckout }: CartMobileBarProps) {
  return (
    <>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t shadow-lg z-50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold">{formatPrice(finalTotal)}</p>
          </div>
          <Button 
            className="gap-2 flex-1" 
            onClick={onCheckout}
            size="lg"
          >
            Pagar
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="h-24 lg:hidden" />
    </>
  );
}