import styled from 'styled-components';

const COLUMN_WIDTH = 400;
const GAP = 16;
const BREAK_POINT = 1100;

export const FiltersAndContentContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: ${GAP}px;
  width: 100%;

  @media (max-width: ${BREAK_POINT}px) {
    flex-direction: column;
  }
`;

export const FilterSection = styled.div`
  display: block;
  flex-shrink: 0;
  flex-grow: 0;
  border-right: 1px solid #c6c2bf;
  padding-top: 32px;
  padding-right: 16px;
  margin-right: 0;
  width: 320px;

  @media (max-width: ${BREAK_POINT}px) {
    width: 100%;
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: ${GAP}px;
  padding-bottom: 40px;
  padding-top: ${GAP}px;
`;

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

export const StickyContainer = styled.div`
  position: sticky;
  top: 48px;
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

export const StyledCharts = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${GAP}px;
`;

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30vh;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
`;
