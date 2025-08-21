import { describe, expect, it } from 'bun:test';
import { AppTheme } from '@app/app-theme';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import type { DataSet } from '../types';
import { getStats } from './helpers/test-helpers';
import { getMangelfullDetailsDatasets } from './mangelfull-details';

const UTREDNINGEN_FULLY_MANGELFULL = getStats({
  utredningen: Radiovalg.MANGELFULLT,
  utredningenAvMedisinskeForhold: true,
  utredningenAvInntektsforhold: true,
  utredningenAvArbeidsaktivitet: true,
  utredningenAvEoesUtenlandsproblematikk: true,
  utredningenAvSivilstandBoforhold: true,
  utredningenAvAndreAktuelleForholdISaken: true,
});

const UTREDNINGEN_FULLY_BRA = getStats({
  utredningen: Radiovalg.BRA,
  utredningenAvMedisinskeForhold: false,
  utredningenAvInntektsforhold: false,
  utredningenAvArbeidsaktivitet: false,
  utredningenAvEoesUtenlandsproblematikk: false,
  utredningenAvSivilstandBoforhold: false,
  utredningenAvAndreAktuelleForholdISaken: false,
});

describe('getDatasets', () => {
  it('should calculate one simple dataset', () => {
    expect.assertions(10);

    const stats: DataSet[] = [
      {
        label: 'Min',
        data: [
          getStats({
            utredningen: Radiovalg.MANGELFULLT,
            utredningenAvMedisinskeForhold: false,
            utredningenAvInntektsforhold: true,
            utredningenAvArbeidsaktivitet: true,
            utredningenAvEoesUtenlandsproblematikk: true,
            utredningenAvSivilstandBoforhold: true,
            utredningenAvAndreAktuelleForholdISaken: true,
          }),
        ],
      },
    ];

    const { datasets } = getMangelfullDetailsDatasets(stats, 'avvik', AppTheme.LIGHT);

    // utredningenAvMedisinskeForhold is false, therefore 0 in the dataset, therefore excluded in the results

    const [
      // utredningenAvMedisinskeForhold,
      utredningenAvInntektsforhold,
      utredningenAvArbeidsaktivitet,
      utredningenAvEoesUtenlandsproblematikk,
      utredningenAvSivilstandBoforhold,
      utredningenAvAndreAktuelleForholdISaken,
    ] = datasets;

    expect(utredningenAvInntektsforhold?.percentages).toStrictEqual([0, 100, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.percentages).toStrictEqual([0, 100, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.percentages).toStrictEqual([0, 100, 0, 0]);
    expect(utredningenAvSivilstandBoforhold?.percentages).toStrictEqual([0, 100, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.percentages).toStrictEqual([0, 100, 0, 0]);

    expect(utredningenAvInntektsforhold?.data).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.data).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.data).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvSivilstandBoforhold?.data).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.data).toStrictEqual([0, 1, 0, 0]);
  });

  it('should calculate two simple datasets', () => {
    expect.assertions(12);

    const stats: DataSet[] = [
      { label: 'Min', data: [UTREDNINGEN_FULLY_MANGELFULL] },
      { label: 'Andre', data: [UTREDNINGEN_FULLY_BRA] },
    ];

    const { datasets } = getMangelfullDetailsDatasets(stats, 'avvik', AppTheme.LIGHT);

    const [
      utredningenAvMedisinskeForhold,
      utredningenAvInntektsforhold,
      utredningenAvArbeidsaktivitet,
      utredningenAvEoesUtenlandsproblematikk,
      utredningenAvSivilstandBoforhold,
      utredningenAvAndreAktuelleForholdISaken,
    ] = datasets;

    expect(utredningenAvMedisinskeForhold?.percentages).toStrictEqual([0, 0, 100, 0, 0, 0, 0, 0]);
    expect(utredningenAvInntektsforhold?.percentages).toStrictEqual([0, 0, 100, 0, 0, 0, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.percentages).toStrictEqual([0, 0, 100, 0, 0, 0, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.percentages).toStrictEqual([0, 0, 100, 0, 0, 0, 0, 0]);
    expect(utredningenAvSivilstandBoforhold?.percentages).toStrictEqual([0, 0, 100, 0, 0, 0, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.percentages).toStrictEqual([0, 0, 100, 0, 0, 0, 0, 0]);

    expect(utredningenAvMedisinskeForhold?.data).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvInntektsforhold?.data).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.data).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.data).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvSivilstandBoforhold?.data).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.data).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
  });

  it('should calculate one complex dataset', () => {
    expect.assertions(12);

    const stats: DataSet[] = [
      {
        label: 'Min',
        data: [
          UTREDNINGEN_FULLY_BRA,
          UTREDNINGEN_FULLY_BRA,
          UTREDNINGEN_FULLY_MANGELFULL,
          getStats({
            utredningen: Radiovalg.MANGELFULLT,
            utredningenAvMedisinskeForhold: true, // Mangelfull
            utredningenAvInntektsforhold: true, // Mangelfull
            utredningenAvArbeidsaktivitet: true, // Mangelfull
            utredningenAvEoesUtenlandsproblematikk: false,
            utredningenAvSivilstandBoforhold: false,
            utredningenAvAndreAktuelleForholdISaken: false,
          }),
        ],
      },
    ];

    const { datasets } = getMangelfullDetailsDatasets(stats, 'avvik', AppTheme.LIGHT);

    const [
      utredningenAvMedisinskeForhold,
      utredningenAvInntektsforhold,
      utredningenAvArbeidsaktivitet,
      utredningenAvEoesUtenlandsproblematikk,
      utredningenAvSivilstandBoforhold,
      utredningenAvAndreAktuelleForholdISaken,
    ] = datasets;

    expect(utredningenAvMedisinskeForhold?.percentages).toStrictEqual([0, 50, 0, 0]);
    expect(utredningenAvInntektsforhold?.percentages).toStrictEqual([0, 50, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.percentages).toStrictEqual([0, 50, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.percentages).toStrictEqual([0, 25, 0, 0]);
    expect(utredningenAvSivilstandBoforhold?.percentages).toStrictEqual([0, 25, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.percentages).toStrictEqual([0, 25, 0, 0]);

    expect(utredningenAvMedisinskeForhold?.data).toStrictEqual([0, 2, 0, 0]);
    expect(utredningenAvInntektsforhold?.data).toStrictEqual([0, 2, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.data).toStrictEqual([0, 2, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.data).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvSivilstandBoforhold?.data).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.data).toStrictEqual([0, 1, 0, 0]);
  });
});
