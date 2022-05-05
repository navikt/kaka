import {
  ReasonLabel,
  brukAvRaadgivendeLegeReasons,
  klageforberedelsenReasons,
  utredningenReasons,
  vedtaketReasons,
} from '../../../kvalitetsvurdering/kvalitetsskjema/reasons-labels';
import { KvalitetsvurderingProps } from './kvalitetsvurdering';

interface IOption {
  title: string;
  relevantReasons: ReasonLabel[];
}

export const KVALITETSVURDERING_OPTIONS: { [key in KvalitetsvurderingProps['field']]: IOption } = {
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
