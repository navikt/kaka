import { Heading } from '@navikt/ds-react';
import { styled } from 'styled-components';

export const RadioButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

export const StyledCheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  align-items: center;
`;

export const StyledHeading = styled(Heading)`
  display: flex;
  align-items: center;
  gap: 8px;
`;
