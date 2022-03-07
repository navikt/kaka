import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { QueryParams } from '../filters/filter-query-params';
import { BehandlingsTidEnum } from './types';

export const ToggleTotalOrKA = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = Number.parseInt(searchParams.get(QueryParams.BEHANDLINGSTID) ?? BehandlingsTidEnum.KA.toString(), 10);

  const setType = (behandlingstidType: BehandlingsTidEnum) => {
    searchParams.set(QueryParams.BEHANDLINGSTID, behandlingstidType.toString());
    setSearchParams(searchParams);
  };

  return (
    <StyledRadiogruppe>
      <Radio
        label="Vedtaksinstans"
        value={BehandlingsTidEnum.VEDTAKSINSTANS}
        name="vedtaksinstansBehandlingstidDays"
        onChange={() => setType(BehandlingsTidEnum.VEDTAKSINSTANS)}
        checked={type === BehandlingsTidEnum.VEDTAKSINSTANS}
      />
      <Radio
        label="Klageinstans"
        value={BehandlingsTidEnum.KA}
        name="behandlingstidDays"
        onChange={() => setType(BehandlingsTidEnum.KA)}
        checked={type === BehandlingsTidEnum.KA}
      />
      <Radio
        label="Total"
        value={BehandlingsTidEnum.TOTAL}
        name="totalBehandlingstidDays"
        onChange={() => setType(BehandlingsTidEnum.TOTAL)}
        checked={type === BehandlingsTidEnum.TOTAL}
      />
    </StyledRadiogruppe>
  );
};

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
