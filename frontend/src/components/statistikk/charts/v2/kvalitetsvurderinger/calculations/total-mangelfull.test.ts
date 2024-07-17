import { describe, expect, it } from 'bun:test';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { Dataset, useData } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/mangelfull';
import { Radiovalg, RadiovalgExtended } from '@app/types/kvalitetsvurdering/radio';

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

describe('getTotalMangelfullDatasets', () => {
  it('should calculate correctly from 1 fully BRA and 1 fully MANGELFULL vurdering', () => {
    expect.assertions(9);

    const stats = [{ label: '', data: [BRA_VURDERING, MANGELFULL_VURDERING] }];

    const result = useData(stats);
    expect(result.datasets).toHaveLength(1);
    const [onlyDataset] = result.datasets;
    const { data, counts } = getCountsAndPercentages(onlyDataset);

    const [klageforberedelsenPercentage, utredningenPercentage, vedtaketPercentage, brukAvRolPercentage] = data;
    const [klageforberedelsenCount, utredningenCount, vedtaketCount, brukAvRolCount] = counts;

    expect(klageforberedelsenPercentage).toBe(0.5);
    expect(utredningenPercentage).toBe(0.5);
    expect(vedtaketPercentage).toBe(0.5);
    expect(brukAvRolPercentage).toBe(0.5);

    expect(klageforberedelsenCount).toBe(1);
    expect(utredningenCount).toBe(1);
    expect(vedtaketCount).toBe(1);
    expect(brukAvRolCount).toBe(1);
  });

  it('should calculate correctly from 1 fully BRA and one partially MANGELFULL vurdering', () => {
    expect.assertions(9);

    const stats = [
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
    const result = useData(stats);
    expect(result.datasets).toHaveLength(1);
    const [onlyDataset] = result.datasets;
    const { data, counts } = getCountsAndPercentages(onlyDataset);

    const [klageforberedelsenPercentage, utredningenPercentage, vedtaketPercentage, brukAvRolPercentage] = data;
    const [klageforberedelsenCount, utredningenCount, vedtaketCount, brukAvRolCount] = counts;

    expect(klageforberedelsenPercentage).toBe(0);
    expect(utredningenPercentage).toBe(0);
    expect(vedtaketPercentage).toBe(0.5);
    expect(brukAvRolPercentage).toBe(0.5);

    expect(klageforberedelsenCount).toBe(0);
    expect(utredningenCount).toBe(0);
    expect(vedtaketCount).toBe(1);
    expect(brukAvRolCount).toBe(1);
  });

  it('should calculate correctly from 2 fully BRA, 1 fully MANGELFULL and 1 partially MANGELFULL (ROL)', () => {
    expect.assertions(9);

    const stats = [
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

    const result = useData(stats);
    expect(result.datasets).toHaveLength(1);
    const [onlyDataset] = result.datasets;
    const { data, counts } = getCountsAndPercentages(onlyDataset);

    const [klageforberedelsenPercentage, utredningenPercentage, vedtaketPercentage, brukAvRolPercentage] = data;
    const [klageforberedelsenCount, utredningenCount, vedtaketCount, brukAvRolCount] = counts;

    expect(klageforberedelsenPercentage).toBe(0.25);
    expect(utredningenPercentage).toBe(0.25);
    expect(vedtaketPercentage).toBe(0.25);
    expect(brukAvRolPercentage).toBe(0.5);

    expect(klageforberedelsenCount).toBe(1);
    expect(utredningenCount).toBe(1);
    expect(vedtaketCount).toBe(1);
    expect(brukAvRolCount).toBe(2);
  });
});

type FourNumbers = [number, number, number, number];

const getCountsAndPercentages = (dataset: Dataset | undefined): { counts: FourNumbers; data: FourNumbers } => {
  if (dataset === undefined) {
    throw new Error('dataset is undefined');
  }
  const { data, counts } = dataset;
  const [klageforberedelsenPercentage, utredningenPercentage, vedtaketPercentage, brukAvRolPercentage] = data;
  const [klageforberedelsenCount, utredningenCount, vedtaketCount, brukAvRolCount] = counts;

  if (
    klageforberedelsenPercentage === undefined ||
    utredningenPercentage === undefined ||
    vedtaketPercentage === undefined ||
    brukAvRolPercentage === undefined ||
    klageforberedelsenCount === undefined ||
    utredningenCount === undefined ||
    vedtaketCount === undefined ||
    brukAvRolCount === undefined
  ) {
    throw new Error('One of the values is undefined');
  }

  return {
    data: [klageforberedelsenPercentage, utredningenPercentage, vedtaketPercentage, brukAvRolPercentage],
    counts: [klageforberedelsenCount, utredningenCount, vedtaketCount, brukAvRolCount],
  };
};
