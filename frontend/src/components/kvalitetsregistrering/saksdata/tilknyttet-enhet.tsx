import AlertStripe from 'nav-frontend-alertstriper';
import { Select } from 'nav-frontend-skjema';
import React from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useEnheter } from '../../../hooks/use-enheter';
import { useKvalitetsvurderingIsFinished } from '../../../hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useSetTilknyttetEnhetMutation } from '../../../redux-api/saksdata';

export const TilknyttetEnhet = () => {
  const { data: user } = useGetUserDataQuery();
  const [saksdata] = useSaksdata();
  const [updateTilknyttetEnhet] = useSetTilknyttetEnhetMutation();
  const enheter = useEnheter();
  const canEdit = useCanEdit();
  const isFinished = useKvalitetsvurderingIsFinished();

  if (typeof enheter === 'undefined' || typeof saksdata === 'undefined' || typeof user === 'undefined') {
    return <StyledAlertStripe type="info">Laster...</StyledAlertStripe>;
  }

  const { klageenheter, navn, ident } = user;

  const name = navn.sammensattNavn ?? ident;

  if (isFinished) {
    const enhet = enheter.find(({ id }) => id === saksdata.tilknyttetEnhet)?.beskrivelse ?? 'ingen enhet';

    return (
      <StyledAlertStripe type="suksess">
        Saken ble registrert av {saksdata.utfoerendeSaksbehandler}, tilknyttet {enhet}.
      </StyledAlertStripe>
    );
  }

  if (!canEdit) {
    const enhet = enheter.find(({ id }) => id === saksdata.tilknyttetEnhet)?.beskrivelse ?? 'ingen enhet';

    return (
      <StyledAlertStripe type="advarsel">
        Saken er under utfylling av {saksdata.utfoerendeSaksbehandler}, tilknyttet {enhet}.
      </StyledAlertStripe>
    );
  }

  if (klageenheter.length === 0) {
    return (
      <StyledAlertStripe type="advarsel">
        Du er logget inn som {name}, men har ingen enheter tilgjengelige.
      </StyledAlertStripe>
    );
  }

  if (klageenheter.length === 1) {
    return (
      <StyledAlertStripe type="info">
        Du er logget inn som {name}, tilknyttet {klageenheter[0].beskrivelse}.
      </StyledAlertStripe>
    );
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) =>
    updateTilknyttetEnhet({ id: saksdata.id, tilknyttetEnhet: target.value });

  return (
    <StyledAlertStripe type="info">
      Du er logget inn som {name}, tilknyttet:
      <StyledSelect
        onChange={onChange}
        bredde="l"
        data-testid="tilknyttet-enhet-select"
        value={saksdata.tilknyttetEnhet}
      >
        {klageenheter.map(({ id, beskrivelse }) => (
          <option key={id} value={id}>
            {beskrivelse}
          </option>
        ))}
      </StyledSelect>
    </StyledAlertStripe>
  );
};

const StyledAlertStripe = styled(AlertStripe)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2em;

  .alertstripe__tekst {
    max-width: none;
  }
`;

const StyledSelect = styled(Select)`
  display: inline-block;
  margin-left: 1em;
`;
