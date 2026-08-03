const X_AXIS_HEIGHT = 26;
const X_AXIS_LABEL_HEIGHT = 19;
export const BAR_WITHOUT_TEXT_HEIGHT = 24;
export const BAR_WITH_TEXT_HEIGHT = 40;
const GAP = 4;

interface ChartHeightProps {
  textInBar: boolean;
  barCount: number;
  xAxisLabel: boolean;
}

export const getBarChartHeight = ({ textInBar, barCount, xAxisLabel }: ChartHeightProps): number => {
  const barHeight = textInBar ? BAR_WITH_TEXT_HEIGHT : BAR_WITHOUT_TEXT_HEIGHT;
  const axisLabelHeight = xAxisLabel ? X_AXIS_LABEL_HEIGHT : 0;

  return barHeight * barCount + GAP * Math.max(barCount - 1, 0) + X_AXIS_HEIGHT + axisLabelHeight;
};
