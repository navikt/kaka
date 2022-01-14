import styled from 'styled-components';

export const ContentArea = styled.div`
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 32px;
  width: 100%;
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

export const ChartSectionTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 32px;
  line-height: 1;
`;

export const FiltersAndContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  position: relative;
`;

export const FilterSection = styled(ContentArea)`
  border-right: 1px solid #c6c2bf;
  padding-top: 32px;
  max-width: 320px;
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
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
`;
