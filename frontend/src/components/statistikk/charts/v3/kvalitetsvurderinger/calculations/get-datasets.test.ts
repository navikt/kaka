import { describe, expect, it } from 'bun:test';
import { AppTheme } from '@app/app-theme';
import { VeiledningspliktenBoolean } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { getDatasets } from './get-datasets';
import { getStats } from './helpers/test-helpers';

describe('getDatasets', () => {
  const reasonIds = [
    VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser,
    VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenNavHarIkkeGittGodNokVeiledning,
  ];

  const reasonTexts = {
    [VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser]: {
      label: 'Parten har ikke fått svar på henvendelser',
      color: ColorToken.Accent500,
    },
    [VeiledningspliktenBoolean.saksbehandlingsreglerVeiledningspliktenNavHarIkkeGittGodNokVeiledning]: {
      label: 'NAV har ikke gitt god nok veiledning',
      color: ColorToken.Accent600,
    },
  };

  it('should return correct data for 1 mangelfull sak with 1 mangelfull veiledningsplikten detail', () => {
    expect.assertions(2);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            saksbehandlingsregler: Radiovalg.MANGELFULLT,
            saksbehandlingsreglerBruddPaaVeiledningsplikten: true,
            saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser: true,
          },
        ].map(getStats),
      },
    ];

    const result = getDatasets(stats, reasonIds, reasonTexts, 'avvik', AppTheme.LIGHT);

    expect(result.datasets?.[0]?.percentages).toStrictEqual([100]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
  });

  it('should return correct data for 1 bra sak and 1 mangelfull sak with 1 mangelfull veiledningsplikten detail', () => {
    expect.assertions(2);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            saksbehandlingsregler: Radiovalg.MANGELFULLT,
            saksbehandlingsreglerBruddPaaVeiledningsplikten: true,
            saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser: true,
          },
          { saksbehandlingsregler: Radiovalg.BRA },
        ].map(getStats),
      },
    ];

    const result = getDatasets(stats, reasonIds, reasonTexts, 'avvik', AppTheme.LIGHT);

    expect(result.datasets?.[0]?.percentages).toStrictEqual([50]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
  });

  it('should return correct data for 2 mangelfulle saksbehandlingsreglene-saker where 1 is mangelfull on veiledningsplikten', () => {
    expect.assertions(2);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            saksbehandlingsregler: Radiovalg.MANGELFULLT,
            saksbehandlingsreglerBruddPaaVeiledningsplikten: true,
            saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser: true,
          },
          {
            saksbehandlingsregler: Radiovalg.MANGELFULLT,
            saksbehandlingsreglerBruddPaaVeiledningsplikten: false,
            saksbehandlingsreglerBruddPaaUtredningsplikten: true,
          },
        ].map(getStats),
      },
    ];

    const result = getDatasets(stats, reasonIds, reasonTexts, 'avvik', AppTheme.LIGHT);

    expect(result.datasets?.[0]?.percentages).toStrictEqual([50]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
  });

  it('should return correct data for 2 mangelfulle saker, but only 1 is mangelfull on saksbehandlingsreglene / veiledningsplikten', () => {
    expect.assertions(2);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            saksbehandlingsregler: Radiovalg.MANGELFULLT,
            saksbehandlingsreglerBruddPaaVeiledningsplikten: true,
            saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser: true,
          },
          {
            saerregelverk: Radiovalg.MANGELFULLT,
          },
        ].map(getStats),
      },
    ];

    const result = getDatasets(stats, reasonIds, reasonTexts, 'avvik', AppTheme.LIGHT);

    expect(result.datasets?.[0]?.percentages).toStrictEqual([50]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
  });

  it('should return correct for 1 mangelfull sak where 2 veiledningsplikten details are mangelfulle', () => {
    expect.assertions(4);

    const stats = [
      {
        label: 'Min',
        data: [
          {
            saksbehandlingsregler: Radiovalg.MANGELFULLT,
            saksbehandlingsreglerBruddPaaVeiledningsplikten: true,
            saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser: true,
            saksbehandlingsreglerVeiledningspliktenNavHarIkkeGittGodNokVeiledning: true,
          },
        ].map(getStats),
      },
    ];

    const result = getDatasets(stats, reasonIds, reasonTexts, 'avvik', AppTheme.LIGHT);

    expect(result.datasets?.[0]?.percentages).toStrictEqual([100]);
    expect(result.datasets?.[1]?.percentages).toStrictEqual([100]);
    expect(result.datasets?.[0]?.data).toStrictEqual([1]);
    expect(result.datasets?.[1]?.data).toStrictEqual([1]);
  });
});
