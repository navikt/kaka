import React from 'react';
import styled from 'styled-components';

const PADDING_TOP = 15;
const PADDING_BOTTOM = 60;

const PADDING = PADDING_TOP + PADDING_BOTTOM;

interface Props {
  barCount: number;
  barThickness?: number;
  barPadding?: number;
  children: React.ReactNode;
}

export const HorizontalBars = ({ barCount, children, barPadding = 2, barThickness = 30 }: Props) => {
  const barSize = barThickness + barPadding;
  const height = PADDING + barSize * barCount;

  return <Container $height={height}>{children}</Container>;
};

const Container = styled.div<{ $height: number }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height}px;
`;
