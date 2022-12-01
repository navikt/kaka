import { Heading, Loader } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { FraVedtaksenhet } from './fra-vedtaksenhet';
import { Lovhjemmel } from './lovhjemmel/lovhjemmel';
import { MottattKlageinstans } from './mottatt-klageinstans';
import { MottattVedtaksinstans } from './mottatt-vedtaksinstans';
import { SakenGjelder } from './saken-gjelder';
import { Sakstype } from './sakstype';
import { UtfallResultat } from './utfall-resultat';
import { Ytelse } from './ytelse';

export const Saksdata = () => {
  const { isLoading } = useSaksdata();

  if (isLoading) {
    return <Loader size="3xlarge" />;
  }

  return (
    <StyledSaksdata>
      <Heading level="1" size="medium">
        Saksdata
      </Heading>
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
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding-top: 32px;
`;
