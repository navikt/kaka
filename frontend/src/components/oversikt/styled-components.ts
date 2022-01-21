import styled from 'styled-components';

const COLUMNS = 2;

export const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(${COLUMNS}, 1fr);
  grid-gap: 16px;
  padding-top: 0;
  padding-left: 16px;
  padding-right: 0;
  padding-bottom: 40px;
  flex-grow: 1;
`;

export const StickyStats = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: sticky;
  gap: 16px;
  justify-content: space-between;
  z-index: 3;
  top: 48px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 0;
  padding-bottom: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  grid-column-start: 1;
  grid-column-end: ${COLUMNS + 1};
`;

export const FullWidthCard = styled.section`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  grid-column-start: 1;
  grid-column-end: ${COLUMNS + 1};
`;

export const HalfWidthCard = styled.section`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
`;

export const KeyStatsArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
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
  gap: 16px;
  max-width: 1000px;
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
