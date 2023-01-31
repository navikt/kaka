import { HelpText } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { ChartTitle } from '../styled-components';

interface Props {
  children: string;
}

export const TitleWithExplainer = ({ children }: Props) => (
  <StyledHeading>
    <span>{children}</span>
    <HelpText>
      <HelpTextContent>
        Antall avvik er det antallet avhukninger som er gjort totalt i kvalitetsvurderingene. Merk at én sak kan ha
        flere avvik.
      </HelpTextContent>
    </HelpText>
  </StyledHeading>
);

const StyledHeading = styled(ChartTitle)`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
`;

const HelpTextContent = styled.div`
  text-align: left;
`;
