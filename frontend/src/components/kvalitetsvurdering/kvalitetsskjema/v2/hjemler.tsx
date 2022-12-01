import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React from 'react';
import { useRegistreringshjemlerMap } from '../../../../simple-api-state/use-kodeverk';
import { useKvalitetsvurderingV2 } from './use-kvalitetsvurdering-v2';

export const Hjemler = () => {
  const { saksdata, kvalitetsvurdering, update, isLoading, isUpdating } = useKvalitetsvurderingV2();
  const { data: registreringshjemlerMap, isLoading: registreringshjemlerMapIsLoading } = useRegistreringshjemlerMap();

  if (isLoading || registreringshjemlerMapIsLoading || typeof registreringshjemlerMap === 'undefined') {
    return null;
  }

  const onChange = (hjemler: string[]) => update({ hjemler });

  return (
    <CheckboxGroup legend="Hjemler" onChange={onChange} value={kvalitetsvurdering.hjemler}>
      {saksdata.hjemmelIdList.map((hjemmelId) => (
        <Checkbox key={hjemmelId} value={hjemmelId} disabled={isUpdating}>
          {registreringshjemlerMap[hjemmelId]?.hjemmelnavn ?? hjemmelId}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};
