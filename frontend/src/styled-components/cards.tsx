import { Heading } from '@navikt/ds-react';
import { styled } from 'styled-components';
import { BREAK_POINT, GAP } from './constants';

const BaseCard = styled.section`
  padding: 16px;
  border-radius: 4px;
  box-shadow: var(--ax-shadow-dialog);
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0px;
  z-index: 3;
`;

export const FullWidthStickyContainer = styled(StickyContainer)`
  width: 100%;
`;

export const StatsContainer = styled(BaseCard)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${GAP * 2}px;
  justify-content: center;
  background-color: var(--ax-bg-default);
  height: fit-content;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${BREAK_POINT}px) {
    position: static;
  }
`;

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <Heading size="medium" align="center">
    {children}
  </Heading>
);
