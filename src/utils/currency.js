const formatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

// 1234.5 -> "₹1,234.5"
export function formatPrice(amount) {
  const n = Number(amount);
  return `₹${formatter.format(Number.isFinite(n) ? n : 0)}`;
}
