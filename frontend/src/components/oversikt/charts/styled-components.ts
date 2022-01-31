import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  padding: 16px;
`;

export const ChartContainer = styled(Container)`
  width: 100%;
`;

export const QuarterChartContainer = styled(Container)`
  width: 25%;
`;

export const ThreeQuarterChartContainer = styled(Container)`
  width: 75%;
`;

export const HalfChartContainer = styled(Container)`
  width: 50%;
`;

export const ChartTitle = styled.h2`
  font-size: 16px;
  margin: 0;
  text-align: center;
`;
