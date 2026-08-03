import { describe, expect, test } from 'bun:test';
import { calculateSpan } from '@app/components/statistikk/wrappers/calculate-span';

describe('calculateSpan', () => {
  test('1 span: 1x 250 px card - 2x padding', () => {
    expect(calculateSpan(0)).toBe(1);
    expect(calculateSpan(1)).toBe(1);
    expect(calculateSpan(186)).toBe(1);
  });

  test('2 spans: 2x 250 px cards - 2x padding + 1 gap', () => {
    expect(calculateSpan(187)).toBe(2);
    expect(calculateSpan(460)).toBe(2);
  });

  test('3 spans: 3x 250 px cards - 2x padding + 2 gaps', () => {
    expect(calculateSpan(461)).toBe(3);
    expect(calculateSpan(734)).toBe(3);
    expect(calculateSpan(735)).toBe(4);
  });
});
