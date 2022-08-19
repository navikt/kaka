import { RadiovalgField } from '../../../../types/statistics';
import {
  ReasonLabel,
  brukAvRaadgivendeLegeReasons,
  klageforberedelsenReasons,
  utredningenReasons,
  vedtaketReasons,
} from '../../../kvalitetsvurdering/kvalitetsskjema/reasons-labels';
// import { KvalitetsvurderingProps } from './kvalitetsvurdering';

interface IOption {
  title: string;
  relevantReasons: ReasonLabel[];
}

export const KVALITETSVURDERING_OPTIONS: { [key in RadiovalgField]: IOption } = {
  klageforberedelsenRadioValg: {
    title: 'Klageforberedelsen',
    relevantReasons: klageforberedelsenReasons,
  },

  brukAvRaadgivendeLegeRadioValg: {
    title: 'Bruk av rådgivende lege',
    relevantReasons: brukAvRaadgivendeLegeReasons,
  },

  utredningenRadioValg: {
    title: 'Utredningen',
    relevantReasons: utredningenReasons,
  },

  vedtaketRadioValg: {
    title: 'Vedtak',
    relevantReasons: vedtaketReasons,
  },
};

const ALLOWED_KEYS = Object.keys(KVALITETSVURDERING_OPTIONS);

export const isAllowedKey = (key: string | null): key is RadiovalgField => key !== null && ALLOWED_KEYS.includes(key);
