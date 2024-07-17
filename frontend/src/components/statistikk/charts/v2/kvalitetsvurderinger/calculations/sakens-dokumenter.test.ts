import { describe, expect, it } from 'bun:test';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { getStats } from './helpers/test-helpers';
import { getSakensDokumenterDatasets } from './sakens-dokumenter';

describe('getSakensDokumenterDatasets', () => {
  it('should return correct data for 1 mangelfull sak with 1 mangelfull sakens dokumenter detail', () => {
    expect.assertions(2);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            klageforberedelsen: Radiovalg.MANGELFULLT,
            klageforberedelsenSakensDokumenter: true,
            klageforberedelsenSakensDokumenterManglerFysiskSaksmappe: true,
          },
        ].map(getStats),
      },
    ];

    const result = getSakensDokumenterDatasets(stats, 'avvik');

    expect(result.datasets?.[0]?.percentages).toStrictEqual([100]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
  });

  it('should return correct data for 1 bra sak and 1 mangelfull sak with 1 mangelfull sakens dokumenter detail', () => {
    expect.assertions(2);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            klageforberedelsen: Radiovalg.MANGELFULLT,
            klageforberedelsenSakensDokumenter: true,
            klageforberedelsenSakensDokumenterManglerFysiskSaksmappe: true,
          },
          { klageforberedelsen: Radiovalg.BRA },
        ].map(getStats),
      },
    ];

    const result = getSakensDokumenterDatasets(stats, 'avvik');

    expect(result.datasets?.[0]?.percentages).toStrictEqual([50]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
  });

  it('should return correct data for 2 mangelfulle klageforberedelsen-saker where 1 is mangelfull on sakens dokumenter', () => {
    expect.assertions(2);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            klageforberedelsen: Radiovalg.MANGELFULLT,
            klageforberedelsenSakensDokumenter: true,
            klageforberedelsenSakensDokumenterManglerFysiskSaksmappe: true,
          },
          {
            klageforberedelsen: Radiovalg.MANGELFULLT,
            klageforberedelsenSakensDokumenter: false,
            klageforberedelsenOversittetKlagefristIkkeKommentert: true,
          },
        ].map(getStats),
      },
    ];

    const result = getSakensDokumenterDatasets(stats, 'avvik');

    expect(result.datasets?.[0]?.percentages).toStrictEqual([50]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
  });

  it('should return correct data for 2 mangelfulle saker, but only 1 is mangelfull on klageforberedelsen / sakens dokumenter', () => {
    expect.assertions(2);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            klageforberedelsen: Radiovalg.MANGELFULLT,
            klageforberedelsenSakensDokumenter: true,
            klageforberedelsenSakensDokumenterManglerFysiskSaksmappe: true,
          },
          {
            utredningen: Radiovalg.MANGELFULLT,
          },
        ].map(getStats),
      },
    ];

    const result = getSakensDokumenterDatasets(stats, 'avvik');

    expect(result.datasets?.[0]?.percentages).toStrictEqual([50]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
  });

  it('should return correct for 1 mangelfull sak where 2 sakens dokumenter details are mangelfulle', () => {
    expect.assertions(4);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            klageforberedelsen: Radiovalg.MANGELFULLT,
            klageforberedelsenSakensDokumenter: true,
            klageforberedelsenSakensDokumenterManglerFysiskSaksmappe: true,
            klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn: true,
          },
        ].map(getStats),
      },
    ];

    const result = getSakensDokumenterDatasets(stats, 'avvik');

    expect(result.datasets?.[0]?.percentages).toStrictEqual([100]);
    expect(result.datasets?.[1]?.percentages).toStrictEqual([100]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
    expect(result.datasets?.[1]?.data).toStrictEqual([1]);
  });
});
