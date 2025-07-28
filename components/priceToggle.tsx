"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/formatPrice"; // función para MXN
import { formatUS } from "@/lib/formatPriceUS";

type PriceToggleProps = {
  price: number;
};

export default function PriceToggle({ price }: PriceToggleProps) {
  const [showUSD, setShowUSD] = useState(false);

  const toggleCurrency = () => {
    setShowUSD((prev) => !prev);
  };

  return (
    <button
      onClick={toggleCurrency}
      className="text-primary font-semibold hover:underline focus:outline-none"
      title="Haz clic para cambiar de moneda"
    >
      {showUSD ? formatUS(price) : formatPrice(price)}{" "}
      <span className="text-sm text-muted-foreground">({showUSD ? "USD" : "MXN"})</span>
    </button>
  );
}
