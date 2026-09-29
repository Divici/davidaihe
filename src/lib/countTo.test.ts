import { describe, expect, it } from 'vitest';
import { formatCount } from './countTo';

describe('formatCount', () => {
  it('rounds to whole numbers and keeps the affixes', () => {
    expect(formatCount(29.6, { suffix: '%' })).toBe('30%');
  });

  it('groups thousands', () => {
    expect(formatCount(30000, { suffix: '+' })).toBe('30,000+');
  });

  it('keeps decimals when asked', () => {
    expect(formatCount(3.5, { suffix: '+ yrs', decimals: 1 })).toBe('3.5+ yrs');
    expect(formatCount(1.26, { decimals: 1 })).toBe('1.3');
  });

  it('never shows a negative zero or NaN', () => {
    expect(formatCount(-0.2, {})).toBe('0');
    expect(formatCount(Number.NaN, {})).toBe('0');
  });
});
