import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import styled from 'styled-components';
import { KvalitetsvurderingProps } from './charts/kvalitetsvurderinger/kvalitetsvurdering';
import { KVALITETSVURDERING_OPTIONS } from './charts/kvalitetsvurderinger/kvalitetsvurdering-options';
import { useKvalitetsvurderingParam } from './hooks/use-kvalitetsvurdering-param';

const ALLOWED_KEYS = Object.keys(KVALITETSVURDERING_OPTIONS);

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
      {Object.entries(KVALITETSVURDERING_OPTIONS).map(([key, value]) => (
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
