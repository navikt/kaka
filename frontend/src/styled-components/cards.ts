import styled from 'styled-components';
import { BREAK_POINT, COLUMN_WIDTH, GAP } from './constants';

const BaseCard = styled.section`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
`;

const Card = styled(BaseCard)`
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
  top: 106px;
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
  background-color: #fff;
  height: fit-content;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${BREAK_POINT}px) {
    position: static;
  }
`;

export const CardTitle = styled.h1`
  background-color: #fff;
  padding-top: 0;
  padding-left: 0;
  padding-right: 8px;
  padding-bottom: 8px;
  border-radius: 4px;
  margin-top: 0;
  margin-bottom: 16px;
  z-index: 2;
  font-size: 32px;
  line-height: 1;
  text-align: center;
`;
