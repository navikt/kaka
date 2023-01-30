import { Chart, ChartOptions } from 'chart.js';
import React from 'react';
import styled from 'styled-components';

// Above graph
const PADDING_TOP = 13; // Always present
const TITLE_HEIGHT = 22; // Only present when title is present

// Below graph
const PADDING_BOTTOM = 40; // Always present
const LEGEND_HEIGHT = 24; // Only present when legend is present

const PADDING = PADDING_TOP + PADDING_BOTTOM;

interface Props {
  barCount: number;
  barThickness: number;
  barPadding?: number;
  chartOptions: ChartOptions<'bar'>;
  children: React.ReactNode;
}

export const HorizontalBars = ({ barCount, children, barThickness, barPadding = 2, chartOptions }: Props) => {
  const withLegend = chartOptions.plugins?.legend?.display ?? Chart.defaults.plugins.legend.display === true;
  const withHorizontalTitle = chartOptions.scales?.x?.title?.display ?? Chart.defaults.plugins.title.display === true;

  const barSize = barThickness + barPadding;
  const fixedHeight = PADDING + (withLegend ? LEGEND_HEIGHT : 0) + (withHorizontalTitle ? TITLE_HEIGHT : 0);
  const dynamicHeight = barSize * barCount;
  const height = fixedHeight + dynamicHeight;

  return <Container $height={height}>{children}</Container>;
};

const Container = styled.div<{ $height: number }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height}px;
  margin: 0;
  padding: 0;
`;
