import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { DataSet } from '../types';
import { getStats } from './helpers/test-helpers';
import { getMangelfullDetailsDatasets } from './mangelfull-details';

const UTREDNINGEN_FULLY_MANGELFULL = getStats({
  utredningen: Radiovalg.MANGELFULLT,
  utredningenAvMedisinskeForhold: true,
  utredningenAvInntektsforhold: true,
  utredningenAvArbeidsaktivitet: true,
  utredningenAvEoesUtenlandsproblematikk: true,
  utredningenAvAndreAktuelleForholdISaken: true,
});

const UTREDNINGEN_FULLY_BRA = getStats({
  utredningen: Radiovalg.BRA,
  utredningenAvMedisinskeForhold: false,
  utredningenAvInntektsforhold: false,
  utredningenAvArbeidsaktivitet: false,
  utredningenAvEoesUtenlandsproblematikk: false,
  utredningenAvAndreAktuelleForholdISaken: false,
});

describe('getDatasets', () => {
  it('should calculate one simple dataset', () => {
    expect.assertions(8);

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
            utredningenAvAndreAktuelleForholdISaken: true,
          }),
        ],
      },
    ];

    const { datasets } = getMangelfullDetailsDatasets(stats, 'avvik');

    // utredningenAvMedisinskeForhold is false, therefore 0 in the dataset, therefore excluded in the results

    const [
      // utredningenAvMedisinskeForhold,
      utredningenAvInntektsforhold,
      utredningenAvArbeidsaktivitet,
      utredningenAvEoesUtenlandsproblematikk,
      utredningenAvAndreAktuelleForholdISaken,
    ] = datasets;

    expect(utredningenAvInntektsforhold?.data).toStrictEqual([0, 25, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.data).toStrictEqual([0, 25, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.data).toStrictEqual([0, 25, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.data).toStrictEqual([0, 25, 0, 0]);

    expect(utredningenAvInntektsforhold?.counts).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.counts).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.counts).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.counts).toStrictEqual([0, 1, 0, 0]);
  });

  it('should calculate two simple datasets', () => {
    expect.assertions(10);

    const stats: DataSet[] = [
      { label: 'Min', data: [UTREDNINGEN_FULLY_MANGELFULL] },
      { label: 'Andre', data: [UTREDNINGEN_FULLY_BRA] },
    ];

    const { datasets } = getMangelfullDetailsDatasets(stats, 'avvik');

    const [
      utredningenAvMedisinskeForhold,
      utredningenAvInntektsforhold,
      utredningenAvArbeidsaktivitet,
      utredningenAvEoesUtenlandsproblematikk,
      utredningenAvAndreAktuelleForholdISaken,
    ] = datasets;

    expect(utredningenAvMedisinskeForhold?.data).toStrictEqual([0, 0, 20, 0, 0, 0, 0, 0]);
    expect(utredningenAvInntektsforhold?.data).toStrictEqual([0, 0, 20, 0, 0, 0, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.data).toStrictEqual([0, 0, 20, 0, 0, 0, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.data).toStrictEqual([0, 0, 20, 0, 0, 0, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.data).toStrictEqual([0, 0, 20, 0, 0, 0, 0, 0]);

    expect(utredningenAvMedisinskeForhold?.counts).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvInntektsforhold?.counts).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.counts).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.counts).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.counts).toStrictEqual([0, 0, 1, 0, 0, 0, 0, 0]);
  });

  it('should calculate one complex dataset', () => {
    expect.assertions(10);

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
            utredningenAvAndreAktuelleForholdISaken: false,
          }),
        ],
      },
    ];

    const { datasets } = getMangelfullDetailsDatasets(stats, 'avvik');

    const [
      utredningenAvMedisinskeForhold,
      utredningenAvInntektsforhold,
      utredningenAvArbeidsaktivitet,
      utredningenAvEoesUtenlandsproblematikk,
      utredningenAvAndreAktuelleForholdISaken,
    ] = datasets;

    expect(utredningenAvMedisinskeForhold?.data).toStrictEqual([0, 12.5, 0, 0]);
    expect(utredningenAvInntektsforhold?.data).toStrictEqual([0, 12.5, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.data).toStrictEqual([0, 12.5, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.data).toStrictEqual([0, 6.25, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.data).toStrictEqual([0, 6.25, 0, 0]);

    expect(utredningenAvMedisinskeForhold?.counts).toStrictEqual([0, 2, 0, 0]);
    expect(utredningenAvInntektsforhold?.counts).toStrictEqual([0, 2, 0, 0]);
    expect(utredningenAvArbeidsaktivitet?.counts).toStrictEqual([0, 2, 0, 0]);
    expect(utredningenAvEoesUtenlandsproblematikk?.counts).toStrictEqual([0, 1, 0, 0]);
    expect(utredningenAvAndreAktuelleForholdISaken?.counts).toStrictEqual([0, 1, 0, 0]);
  });
});
