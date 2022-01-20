import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import styled from 'styled-components';
import {
  KLAGEFORBEREDELSEN_REASON_NAMES,
  RAADGIVENDE_LEGE_REASON_NAMES,
  UTREDNINGEN_REASON_NAMES,
  VEDTAKET_REASON_NAMES,
} from '../../hooks/use-reason-name';
import { KvalitetsvurderingProps } from './charts/kvalitetsvurdering';
import { useKvalitetsvurderingParam } from './hooks/use-kvalitetsvurdering-param';

interface IOption {
  title: string;
  relevantReasons: string[];
}

export const OPTIONS: { [key in KvalitetsvurderingProps['field']]: IOption } = {
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

const ALLOWED_KEYS = Object.keys(OPTIONS);

export const ToggleKvalitetsvurdering = () => {
  const [field, setField] = useKvalitetsvurderingParam();

  const kvalitetsvurdering: KvalitetsvurderingProps['field'] = isAllowedKey(field)
    ? field
    : 'klageforberedelsenRadioValg';

  const setKvalitetsvurdering = (kvalitetsvurderingId: KvalitetsvurderingProps['field']) => {
    setField(kvalitetsvurderingId);
  };

  return (
    <StyledRadiogruppe>
      {Object.entries(OPTIONS).map(([key, value]) => (
        <Radio
          key={key}
          name={key}
          label={value.title}
          onChange={() => {
            if (isAllowedKey(key)) {
              setKvalitetsvurdering(key);
            }
          }}
          checked={kvalitetsvurdering === key}
        />
      ))}
    </StyledRadiogruppe>
  );
};

export const isAllowedKey = (key: string | null): key is KvalitetsvurderingProps['field'] =>
  key !== null && ALLOWED_KEYS.includes(key);

const StyledRadiogruppe = styled(RadioGruppe)`
  display: flex;
  justify-content: center;

  .skjemaelement {
    margin-right: 1em;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
