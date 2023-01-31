import { Radiovalg } from '../../../../../../types/kvalitetsvurdering/radio';
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
        ],
      },
    ];

    const result = getSakensDokumenterDatasets(stats);

    expect(result.datasets?.[0]?.data).toStrictEqual([100]);
    expect(result.datasets?.[0]?.counts).toStrictEqual([1]);
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
        ],
      },
    ];

    const result = getSakensDokumenterDatasets(stats);

    expect(result.datasets?.[0]?.data).toStrictEqual([50]);
    expect(result.datasets?.[0]?.counts).toStrictEqual([1]);
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
        ],
      },
    ];

    const result = getSakensDokumenterDatasets(stats);

    expect(result.datasets?.[0]?.data).toStrictEqual([50]);
    expect(result.datasets?.[0]?.counts).toStrictEqual([1]);
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
        ],
      },
    ];

    const result = getSakensDokumenterDatasets(stats);

    expect(result.datasets?.[0]?.data).toStrictEqual([50]);
    expect(result.datasets?.[0]?.counts).toStrictEqual([1]);
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
        ],
      },
    ];

    const result = getSakensDokumenterDatasets(stats);

    expect(result.datasets?.[0]?.data).toStrictEqual([50]);
    expect(result.datasets?.[1]?.data).toStrictEqual([50]);
    expect(result.datasets?.[0]?.counts).toStrictEqual([1]);
    expect(result.datasets?.[1]?.counts).toStrictEqual([1]);
  });
});
