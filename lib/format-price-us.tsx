import { EXCHANGE_RATE_USD } from "@/lib/constants";

export function formatUS(mxnAmount: number, exchangeRate = EXCHANGE_RATE_USD) {
  const usdAmount = mxnAmount / exchangeRate;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(usdAmount);
}
