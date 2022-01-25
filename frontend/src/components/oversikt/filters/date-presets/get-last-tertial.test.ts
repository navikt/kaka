import dayjs from 'dayjs';
import { getLastTertial } from './get-last-tertial';

// Tertials
// 01.01 - 30.04
// 01.05 - 31.08
// 01.09 - 31.12

describe('get last tertial', () => {
  it('last tertial from january', () => {
    expect.assertions(1);

    const NOW = dayjs('2022-01-20');
    const actual = getLastTertial(NOW);
    const expected = {
      fromDate: '2021-09-01',
      toDate: '2021-12-31',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('last tertial from april', () => {
    expect.assertions(1);

    const NOW = dayjs('2022-04-20');
    const actual = getLastTertial(NOW);
    const expected = {
      fromDate: '2021-09-01',
      toDate: '2021-12-31',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('last tertial from may', () => {
    expect.assertions(1);

    const NOW = dayjs('2022-05-20');
    const actual = getLastTertial(NOW);
    const expected = {
      fromDate: '2022-01-01',
      toDate: '2022-04-30',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('last tertial from june', () => {
    expect.assertions(1);

    const NOW = dayjs('2022-06-20');
    const actual = getLastTertial(NOW);
    const expected = {
      fromDate: '2022-01-01',
      toDate: '2022-04-30',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('last tertial from august', () => {
    expect.assertions(1);

    const NOW = dayjs('2022-08-20');
    const actual = getLastTertial(NOW);
    const expected = {
      fromDate: '2022-01-01',
      toDate: '2022-04-30',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('last tertial from september', () => {
    expect.assertions(1);

    const NOW = dayjs('2022-09-20');
    const actual = getLastTertial(NOW);
    const expected = {
      fromDate: '2022-05-01',
      toDate: '2022-08-31',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('last tertial from october', () => {
    expect.assertions(1);

    const NOW = dayjs('2022-10-20');
    const actual = getLastTertial(NOW);
    const expected = {
      fromDate: '2022-05-01',
      toDate: '2022-08-31',
    };

    expect(actual).toStrictEqual(expected);
  });

  it('last tertial from december', () => {
    expect.assertions(1);

    const NOW = dayjs('2022-12-31');
    const actual = getLastTertial(NOW);
    const expected = {
      fromDate: '2022-05-01',
      toDate: '2022-08-31',
    };

    expect(actual).toStrictEqual(expected);
  });
});
