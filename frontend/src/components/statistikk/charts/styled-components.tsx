import { Heading } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { styled } from 'styled-components';

interface ChartContainerProps {
  $columns?: 1 | 2 | 3 | 4;
}

export const ChartContainer = styled.div<ChartContainerProps>`
  position: relative;
  width: ${({ $columns = 4 }) => $columns * 25}%;
`;

export const ChartTitle = ({ children }: { children: ReactNode }) => (
  <Heading size="xsmall" align="center">
    {children}
  </Heading>
);
