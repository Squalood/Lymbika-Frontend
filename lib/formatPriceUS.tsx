export function formatUS(mxnAmount: number, exchangeRate = 18.00) {
  const usdAmount = mxnAmount / exchangeRate;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(usdAmount);
}
