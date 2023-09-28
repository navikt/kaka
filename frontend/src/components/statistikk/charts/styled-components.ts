import { styled } from 'styled-components';

interface ChartContainerProps {
  columns?: 1 | 2 | 3 | 4;
}

export const ChartContainer = styled.div<ChartContainerProps>`
  position: relative;
  width: ${({ columns = 4 }) => columns * 25}%;
`;

export const ChartTitle = styled.h2`
  font-size: 16px;
  margin: 0;
  text-align: center;
`;
