export type CountFormat = {
  prefix?: string;
  suffix?: string;
  /** Digits kept after the decimal point. Defaults to whole numbers. */
  decimals?: number;
};

export function formatCount(value: number, { prefix = '', suffix = '', decimals = 0 }: CountFormat) {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  const number = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(safe);
  // Rounding can leave "-0" or "0.0" style noise for values near zero.
  return `${prefix}${Number(number.replace(/,/g, '')) === 0 ? (0).toFixed(decimals) : number}${suffix}`;
}
