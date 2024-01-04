import {
  Fylke,
  Vedtaksinstans,
  isFylke,
  isVedtaksinstansgruppe,
} from '@app/components/statistikk/total/vedtaksinstansgruppe-filter';

export const filterVedtaksinstans = (values: string[], enhet: string | null) => {
  const fylker = values.filter(isFylke);
  const vedtaksinstansgrupper = values.filter(isVedtaksinstansgruppe);

  const fylkeOrVedtaksinstansgruppe = mapVedtaksinstans(enhet);

  if (fylkeOrVedtaksinstansgruppe === null) {
    return false;
  }

  if (isFylke(fylkeOrVedtaksinstansgruppe) && fylker.includes(fylkeOrVedtaksinstansgruppe)) {
    return true;
  }

  if (
    isVedtaksinstansgruppe(fylkeOrVedtaksinstansgruppe) &&
    vedtaksinstansgrupper.includes(fylkeOrVedtaksinstansgruppe)
  ) {
    return true;
  }

  return false;
};

const HOLMESTRAND = '5301';
const FÆRDER = '5302';
const LARVIK = '5303';

// eslint-disable-next-line complexity
export const mapVedtaksinstans = (vedtaksinstans: string | null): Fylke | Vedtaksinstans | null => {
  if (vedtaksinstans === null) {
    return null;
  }

  if (vedtaksinstans === HOLMESTRAND || vedtaksinstans === FÆRDER || vedtaksinstans === LARVIK) {
    return Fylke.VESTFOLD;
  }

  const firstTwoChars = vedtaksinstans.substring(0, 2);

  switch (firstTwoChars) {
    case '02':
      return Fylke.AKERSHUS;
    case '03':
      return Fylke.OSLO;
    case '46':
    case '12':
    case '14':
    case '13':
      return Fylke.VESTLAND;
    case '11':
      return Fylke.ROGALAND;
    case '50':
    case '16':
    case '17':
    case '57':
      return Fylke.TRØNDELAG;
    case '34':
    case '04':
    case '05':
      return Fylke.INNLANDET;
    case '42':
    case '09':
    case '10':
      return Fylke.AGDER;
    case '01':
      return Fylke.ØSTFOLD;
    case '15':
      return Fylke.MØRE_OG_ROMSDAL;
    case '06':
      return Fylke.BUSKERUD;
    case '07':
      return Fylke.VESTFOLD;
    case '18':
      return Fylke.NORDLAND;
    case '08':
      return Fylke.TELEMARK;
    case '19':
      return Fylke.TROMS;
    case '20':
      return Fylke.FINNMARK;
    case '41':
      return Vedtaksinstans.NAV_ØKONOMI_STØNAD;
    case '44':
      return Vedtaksinstans.NAV_ARBEID_OG_YTELSER;
    case '45':
      return Vedtaksinstans.NAV_KONTROLL_FORVALTNING;
    case '47':
      return Vedtaksinstans.NAV_HJELPEMIDDELSENTRAL;
    case '48':
      return Vedtaksinstans.NAV_FAMILIE_OG_PENSJONSYTELSER;
    case '30':
    case '53': {
      console.warn(`Kan ikke mappe vedtaksinstansgruppe Viken (${vedtaksinstans}) til ett spesifikt 2024-fylke.`);

      return null;
    }
    case '38': {
      console.warn(
        `Kan ikke mappe vedtaksinstansgruppe Vestfold og Telemark (${vedtaksinstans}) til ett spesifikt 2024-fylke.`,
      );

      return null;
    }
    case '54': {
      console.warn(
        `Kan ikke mappe vedtaksinstansgruppe Troms og Finnmark (${vedtaksinstans}) til ett spesifikt 2024-fylke.`,
      );

      return null;
    }
    default:
      return null;
  }
};
