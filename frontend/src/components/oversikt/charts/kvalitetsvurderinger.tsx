import React from 'react';
import {
  KLAGEFORBEREDELSEN_REASON_NAMES,
  RAADGIVENDE_LEGE_REASON_NAMES,
  UTREDNINGEN_REASON_NAMES,
  VEDTAKET_REASON_NAMES,
} from '../../../hooks/use-reason-name';
import { useKvalitetsvurderingParam } from '../hooks/use-kvalitetsvurdering-param';
import { Kvalitetsvurdering, KvalitetsvurderingProps } from './kvalitetsvurdering';

interface IOption {
  title: string;
  relevantReasons: string[];
}

const OPTIONS: { [key in KvalitetsvurderingProps['field']]: IOption } = {
  klageforberedelsenRadioValg: {
    title: 'Klageforberedelsen',
    relevantReasons: Object.keys(KLAGEFORBEREDELSEN_REASON_NAMES),
  },

  brukAvRaadgivendeLegeRadioValg: {
    title: 'Bruk av rådgivende lege',
    relevantReasons: Object.keys(RAADGIVENDE_LEGE_REASON_NAMES),
  },

  utredningenRadioValg: {
    title: 'Utredningen',
    relevantReasons: Object.keys(UTREDNINGEN_REASON_NAMES),
  },

  vedtaketRadioValg: {
    title: 'Vedtak',
    relevantReasons: Object.keys(VEDTAKET_REASON_NAMES),
  },
};

export const Kvalitetsvurderinger = () => {
  const [field] = useKvalitetsvurderingParam();

  const { title, relevantReasons } = OPTIONS[field];

  return <Kvalitetsvurdering field={field} title={title} relevantReasons={relevantReasons} />;
};
