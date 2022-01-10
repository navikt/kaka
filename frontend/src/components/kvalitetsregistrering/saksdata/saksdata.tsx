import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import styled from 'styled-components';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { FraVedtaksenhet } from './fra-vedtaksenhet';
import { Lovhjemmel } from './lovhjemmel/lovhjemmel';
import { MottattKlageinstans } from './mottatt-klageinstans';
import { MottattVedtaksinstans } from './mottatt-vedtaksinstans';
import { SakenGjelder } from './saken-gjelder';
import { Sakstype } from './sakstype';
import { TilknyttetEnhet } from './tilknyttet-enhet';
import { UtfallResultat } from './utfall-resultat';
import { Ytelse } from './ytelse';

export const Saksdata = () => {
  const [saksdata] = useSaksdata();

  if (typeof saksdata === 'undefined') {
    return <NavFrontendSpinner />;
  }

  return (
    <StyledSaksdata>
      <TilknyttetEnhet />
      <Sakstype />
      <SakenGjelder />
      <Ytelse />
      <MottattVedtaksinstans />
      <MottattKlageinstans />
      <FraVedtaksenhet />
      <UtfallResultat />
      <Lovhjemmel />
    </StyledSaksdata>
  );
};

const StyledSaksdata = styled.section`
  padding-top: 2em;
`;
