import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useEnheter } from '../../../hooks/use-enheter';
import { useKvalitetsvurderingIsFinished } from '../../../hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { ISaksdataBase } from '../../../types/saksdata';

export const TilknyttetEnhet = () => {
  const { data: user } = useGetUserDataQuery();
  const [saksdata] = useSaksdata();

  if (typeof saksdata === 'undefined' || typeof user === 'undefined') {
    return <StyledAlertStripe type="info">Laster...</StyledAlertStripe>;
  }

  if (saksdata.utfoerendeSaksbehandler === user.ident) {
    return null;
  }

  return <ShowUtfoerendeSaksbehandler saksdata={saksdata} />;
};

interface Props {
  saksdata: ISaksdataBase;
}

const ShowUtfoerendeSaksbehandler = ({ saksdata }: Props) => {
  const enheter = useEnheter();
  const canEdit = useCanEdit();
  const isFinished = useKvalitetsvurderingIsFinished();

  if (typeof enheter === 'undefined') {
    return <StyledAlertStripe type="info">Laster...</StyledAlertStripe>;
  }

  if (isFinished) {
    const enhet = enheter.find((e) => e.navn === saksdata.tilknyttetEnhet)?.beskrivelse ?? 'ingen enhet';

    return (
      <StyledAlertStripe type="suksess">
        Saken ble registrert av {saksdata.utfoerendeSaksbehandler}, tilknyttet {enhet}.
      </StyledAlertStripe>
    );
  }

  if (!canEdit) {
    const enhet = enheter.find((e) => e.navn === saksdata.tilknyttetEnhet)?.beskrivelse ?? 'ingen enhet';

    return (
      <StyledAlertStripe type="advarsel">
        Saken er under utfylling av {saksdata.utfoerendeSaksbehandler}, tilknyttet {enhet}.
      </StyledAlertStripe>
    );
  }

  return null;
};

const StyledAlertStripe = styled(AlertStripe)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2em;

  .alertstripe__tekst {
    max-width: none;
  }
`;
