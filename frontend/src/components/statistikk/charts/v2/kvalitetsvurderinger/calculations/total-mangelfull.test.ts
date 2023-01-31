import { Radiovalg, RadiovalgExtended } from '../../../../../../types/kvalitetsvurdering/radio';
import { MainReason } from '../../../../../../types/kvalitetsvurdering/v2';
import { DataSet, getTotalMangelfullDatasets } from './total-mangelfull';

const BRA_VURDERING = {
  [MainReason.Klageforberedelsen]: Radiovalg.BRA,
  [MainReason.Utredningen]: Radiovalg.BRA,
  [MainReason.Vedtaket]: Radiovalg.BRA,
  [MainReason.BrukAvRaadgivendeLege]: RadiovalgExtended.BRA,
};

const MANGELFULL_VURDERING = {
  [MainReason.Klageforberedelsen]: Radiovalg.MANGELFULLT,
  [MainReason.Utredningen]: Radiovalg.MANGELFULLT,
  [MainReason.Vedtaket]: Radiovalg.MANGELFULLT,
  [MainReason.BrukAvRaadgivendeLege]: RadiovalgExtended.MANGELFULLT,
};

const reduceToSum = (acc: number, x: number) => acc + x;

describe('getTotalMangelfullDatasets', () => {
  it('should calculate correctly from 1 fully BRA and 1 fully MANGELFULL vurdering', () => {
    expect.assertions(9);

    const stats: DataSet[] = [{ label: '', data: [BRA_VURDERING, MANGELFULL_VURDERING] }];

    const [klageforberedelsen, utredningen, vedtaket, brukAvRaadgivendeLege] = getTotalMangelfullDatasets(stats);

    const klageforberedelsenSum = klageforberedelsen.data.reduce(reduceToSum, 0);
    const utredningenSum = utredningen.data.reduce(reduceToSum, 0);
    const vedtaketSum = vedtaket.data.reduce(reduceToSum, 0);
    const brukAvRaadgivendeLegeSum = brukAvRaadgivendeLege.data.reduce(reduceToSum, 0);

    const totalMangelfullt = klageforberedelsenSum + utredningenSum + vedtaketSum + brukAvRaadgivendeLegeSum;

    expect(klageforberedelsen.counts).toStrictEqual([1]);
    expect(utredningen.counts).toStrictEqual([1]);
    expect(vedtaket.counts).toStrictEqual([1]);
    expect(brukAvRaadgivendeLege.counts).toStrictEqual([1]);

    expect(vedtaketSum).toBe(12.5);
    expect(utredningenSum).toBe(12.5);
    expect(klageforberedelsenSum).toBe(12.5);
    expect(brukAvRaadgivendeLegeSum).toBe(12.5);

    expect(totalMangelfullt).toBe(50);
  });

  it('should calculate correctly from 1 fully BRA and one partially MANGELFULL vurdering', () => {
    expect.assertions(9);

    const stats: DataSet[] = [
      {
        label: '',
        data: [
          BRA_VURDERING,
          {
            [MainReason.Klageforberedelsen]: Radiovalg.BRA,
            [MainReason.Utredningen]: Radiovalg.BRA,
            [MainReason.Vedtaket]: Radiovalg.MANGELFULLT,
            [MainReason.BrukAvRaadgivendeLege]: RadiovalgExtended.MANGELFULLT,
          },
        ],
      },
    ];

    const [klageforberedelsen, utredningen, vedtaket, brukAvRaadgivendeLege] = getTotalMangelfullDatasets(stats);

    const klageforberedelsenSum = klageforberedelsen.data.reduce(reduceToSum, 0);
    const utredningenSum = utredningen.data.reduce(reduceToSum, 0);
    const vedtaketSum = vedtaket.data.reduce(reduceToSum, 0);
    const brukAvRaadgivendeLegeSum = brukAvRaadgivendeLege.data.reduce(reduceToSum, 0);

    const totalMangelfullt = klageforberedelsenSum + utredningenSum + vedtaketSum + brukAvRaadgivendeLegeSum;

    expect(klageforberedelsen.counts).toStrictEqual([0]);
    expect(utredningen.counts).toStrictEqual([0]);
    expect(vedtaket.counts).toStrictEqual([1]);
    expect(brukAvRaadgivendeLege.counts).toStrictEqual([1]);

    expect(vedtaketSum).toBe(25);
    expect(utredningenSum).toBe(0);
    expect(klageforberedelsenSum).toBe(0);
    expect(brukAvRaadgivendeLegeSum).toBe(25);

    expect(totalMangelfullt).toBe(50);
  });

  it('should calculate correctly from 2 fully BRA, 1 fully MANGELFULL and 1 partially MANGELFULL (ROL)', () => {
    expect.assertions(9);

    const stats: DataSet[] = [
      {
        label: '',
        data: [
          BRA_VURDERING,
          BRA_VURDERING,
          MANGELFULL_VURDERING,
          {
            [MainReason.Klageforberedelsen]: Radiovalg.BRA,
            [MainReason.Utredningen]: Radiovalg.BRA,
            [MainReason.Vedtaket]: Radiovalg.BRA,
            [MainReason.BrukAvRaadgivendeLege]: RadiovalgExtended.MANGELFULLT,
          },
        ],
      },
    ];

    const [klageforberedelsen, utredningen, vedtaket, brukAvRaadgivendeLege] = getTotalMangelfullDatasets(stats);

    const klageforberedelsenSum = klageforberedelsen.data.reduce(reduceToSum, 0);
    const utredningenSum = utredningen.data.reduce(reduceToSum, 0);
    const vedtaketSum = vedtaket.data.reduce(reduceToSum, 0);
    const brukAvRaadgivendeLegeSum = brukAvRaadgivendeLege.data.reduce(reduceToSum, 0);

    const totalMangelfullt = klageforberedelsenSum + utredningenSum + vedtaketSum + brukAvRaadgivendeLegeSum;

    expect(klageforberedelsen.counts).toStrictEqual([1]);
    expect(utredningen.counts).toStrictEqual([1]);
    expect(vedtaket.counts).toStrictEqual([1]);
    expect(brukAvRaadgivendeLege.counts).toStrictEqual([2]);

    expect(vedtaketSum).toBe(10);
    expect(utredningenSum).toBe(10);
    expect(klageforberedelsenSum).toBe(10);
    expect(brukAvRaadgivendeLegeSum).toBe(20);

    expect(totalMangelfullt).toBe(50);
  });
});
