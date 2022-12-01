import { Heading } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { Hjemler } from './hjemler';

export const KvalitetsskjemaV2 = () => (
  <StyledKvalitetsskjema data-testid="kvalitetsskjema">
    <Heading level="1" size="medium">
      Kvalitetsvurdering
    </Heading>
    <Hjemler />
  </StyledKvalitetsskjema>
);

const StyledKvalitetsskjema = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;
