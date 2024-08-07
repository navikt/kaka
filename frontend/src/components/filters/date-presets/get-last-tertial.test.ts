import { describe, expect, it } from 'bun:test';
import { format } from 'date-fns';
import { FORMAT } from './constants';
import { getLastTertial } from './get-last-tertial';

// Tertials
// 01.01 - 30.04
// 01.05 - 31.08
// 01.09 - 31.12

describe('get last tertial', () => {
  it('last tertial from january', () => {
    expect.assertions(2);

    const NOW = new Date('2022-01-01');
    const actual = getLastTertial(NOW);
    const expected: ReturnType<typeof getLastTertial> = {
      fromDate: new Date('2021-09-01'),
      toDate: new Date('2021-12-31'),
    };

    expect(format(actual.fromDate, FORMAT)).toBe(format(expected.fromDate, FORMAT));
    expect(format(actual.toDate, FORMAT)).toBe(format(expected.toDate, FORMAT));
  });

  it('last tertial from april', () => {
    expect.assertions(2);

    const NOW = new Date('2022-04-20');
    const actual = getLastTertial(NOW);
    const expected: ReturnType<typeof getLastTertial> = {
      fromDate: new Date('2021-09-01'),
      toDate: new Date('2021-12-31'),
    };

    expect(format(actual.fromDate, FORMAT)).toBe(format(expected.fromDate, FORMAT));
    expect(format(actual.toDate, FORMAT)).toBe(format(expected.toDate, FORMAT));
  });

  it('last tertial from may', () => {
    expect.assertions(2);

    const NOW = new Date('2022-05-20');
    const actual = getLastTertial(NOW);
    const expected: ReturnType<typeof getLastTertial> = {
      fromDate: new Date('2022-01-01'),
      toDate: new Date('2022-04-30'),
    };

    expect(format(actual.fromDate, FORMAT)).toBe(format(expected.fromDate, FORMAT));
    expect(format(actual.toDate, FORMAT)).toBe(format(expected.toDate, FORMAT));
  });

  it('last tertial from june', () => {
    expect.assertions(2);

    const NOW = new Date('2022-06-20');
    const actual = getLastTertial(NOW);
    const expected: ReturnType<typeof getLastTertial> = {
      fromDate: new Date('2022-01-01'),
      toDate: new Date('2022-04-30'),
    };

    expect(format(actual.fromDate, FORMAT)).toBe(format(expected.fromDate, FORMAT));
    expect(format(actual.toDate, FORMAT)).toBe(format(expected.toDate, FORMAT));
  });

  it('last tertial from august', () => {
    expect.assertions(2);

    const NOW = new Date('2022-08-20');
    const actual = getLastTertial(NOW);
    const expected: ReturnType<typeof getLastTertial> = {
      fromDate: new Date('2022-01-01'),
      toDate: new Date('2022-04-30'),
    };

    expect(format(actual.fromDate, FORMAT)).toBe(format(expected.fromDate, FORMAT));
    expect(format(actual.toDate, FORMAT)).toBe(format(expected.toDate, FORMAT));
  });

  it('last tertial from september', () => {
    expect.assertions(2);

    const NOW = new Date('2022-09-20');
    const actual = getLastTertial(NOW);
    const expected: ReturnType<typeof getLastTertial> = {
      fromDate: new Date('2022-05-01'),
      toDate: new Date('2022-08-31'),
    };

    expect(format(actual.fromDate, FORMAT)).toBe(format(expected.fromDate, FORMAT));
    expect(format(actual.toDate, FORMAT)).toBe(format(expected.toDate, FORMAT));
  });

  it('last tertial from october', () => {
    expect.assertions(2);

    const NOW = new Date('2022-10-20');
    const actual = getLastTertial(NOW);
    const expected: ReturnType<typeof getLastTertial> = {
      fromDate: new Date('2022-05-01'),
      toDate: new Date('2022-08-31'),
    };

    expect(format(actual.fromDate, FORMAT)).toBe(format(expected.fromDate, FORMAT));
    expect(format(actual.toDate, FORMAT)).toBe(format(expected.toDate, FORMAT));
  });

  it('last tertial from december', () => {
    expect.assertions(2);

    const NOW = new Date('2022-12-31');
    const actual = getLastTertial(NOW);
    const expected: ReturnType<typeof getLastTertial> = {
      fromDate: new Date('2022-05-01'),
      toDate: new Date('2022-08-31'),
    };

    expect(format(actual.fromDate, FORMAT)).toBe(format(expected.fromDate, FORMAT));
    expect(format(actual.toDate, FORMAT)).toBe(format(expected.toDate, FORMAT));
  });
});
