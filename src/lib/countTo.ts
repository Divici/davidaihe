const grouped = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export function formatCount(
  value: number,
  { prefix = '', suffix = '' }: { prefix?: string; suffix?: string },
): string {
  const safe = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
  return `${prefix}${grouped.format(safe)}${suffix}`;
}
