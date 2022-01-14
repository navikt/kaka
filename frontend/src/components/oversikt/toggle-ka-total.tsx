import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

enum BehandlingsTidEnum {
  TOTAL,
  KA,
}

export const ToggleTotalOrKA = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = Number.parseInt(searchParams.get('bht') ?? BehandlingsTidEnum.KA.toString(), 10);

  const setType = (behandlingstidType: BehandlingsTidEnum) => {
    searchParams.set('bht', behandlingstidType.toString());
    setSearchParams(searchParams);
  };

  return (
    <StyledRadiogruppe>
      <Radio
        label="Total behandlingstid"
        value={BehandlingsTidEnum.TOTAL}
        name="totalBehandlingstidDays"
        onChange={() => setType(BehandlingsTidEnum.TOTAL)}
        checked={type === BehandlingsTidEnum.TOTAL}
      />
      <Radio
        label="KA-behandlingstid"
        value={BehandlingsTidEnum.KA}
        name="behandlingstidDays"
        onChange={() => setType(BehandlingsTidEnum.KA)}
        checked={type === BehandlingsTidEnum.KA}
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
