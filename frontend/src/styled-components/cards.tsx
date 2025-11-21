import { Heading } from '@navikt/ds-react';
import { styled } from 'styled-components';
import { BREAK_POINT, COLUMN_WIDTH, GAP } from './constants';

const BaseCard = styled.section`
  padding: 16px;
  border-radius: 4px;
  box-shadow: var(--ax-shadow-dialog);
`;

const Card = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
  flex-grow: 0;
`;

export const CardLarge = styled(Card)`
  max-width: ${COLUMN_WIDTH * 4}px;
`;

export const CardMedium = styled(Card)`
  max-width: ${COLUMN_WIDTH * 2 - GAP / 2}px;
`;

export const CardSmall = styled(Card)`
  max-width: ${COLUMN_WIDTH + COLUMN_WIDTH / 3 - (GAP * 2) / 3}px;
`;

export const CardExtraSmall = styled(Card)`
  max-width: ${COLUMN_WIDTH - (GAP * 3) / 4}px;
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
