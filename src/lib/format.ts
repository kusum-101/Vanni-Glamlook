// Locale-independent formatting so server and client render identical markup.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parts = (iso: string) => iso.slice(0, 10).split('-').map(Number) as [number, number, number];

export function formatDate(iso: string) {
  const [y, m, d] = parts(iso);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function formatMonthYear(iso: string) {
  const [y, m] = parts(iso);
  return `${MONTHS[m - 1]} ${y}`;
}
