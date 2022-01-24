import styled from 'styled-components';

const COLUMN_WIDTH = 400;
const GAP = 16;

export const ContentArea = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  flex-direction: row;
  gap: ${GAP}px;
  padding-top: 0;
  padding-left: 16px;
  padding-right: 0;
  padding-bottom: 40px;
`;

const Card = styled.section`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  max-width: 100%;
`;

export const CardLarge = styled(Card)`
  width: ${COLUMN_WIDTH * 4 - GAP}px;
`;

export const CardMedium = styled(Card)`
  width: ${COLUMN_WIDTH * 2 - GAP}px;
`;

export const CardSmall = styled(Card)`
  width: ${COLUMN_WIDTH - GAP}px;
`;

export const StickyStats = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: sticky;
  gap: ${GAP * 2}px;
  justify-content: center;
  z-index: 3;
  top: 48px;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
`;

export const KeyStatsArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${GAP}px;
  justify-content: left;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 100%;
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

export const FiltersAndContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  position: relative;
`;

export const FilterSection = styled.div`
  display: block;
  border-right: 1px solid #c6c2bf;
  padding-top: 32px;
  padding-right: 16px;
  margin-right: 0;
  width: 320px;
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
