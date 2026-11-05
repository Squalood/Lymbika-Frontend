"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format-price"; // función para MXN
import { formatUS } from "@/lib/format-price-us";
import { useSiteConfig } from "@/components/site-config-provider";

type PriceToggleProps = {
  price: number;
};

export default function PriceToggle({ price }: PriceToggleProps) {
  const { exchangeRateUsd } = useSiteConfig();
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
      {showUSD ? formatUS(price, exchangeRateUsd) : formatPrice(price)}{" "}
      <span className="text-sm text-muted-foreground">({showUSD ? "USD" : "MXN"})</span>
    </button>
  );
}
