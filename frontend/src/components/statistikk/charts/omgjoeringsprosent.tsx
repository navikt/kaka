import { ChartData, ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { UTFALL_COLOR_MAP } from '@app/colors/colors';
import { toPercent } from '@app/domain/number';
import { useUtfall } from '@app/simple-api-state/use-utfall';
import { UtfallEnum } from '@app/types/utfall';
import { GetAbsoluteValue, useBarTooltipText } from '../hooks/use-bar-tooltip-text';
import { ComparisonPropsV2 } from '../types';
import { HorizontalBars } from './v2/kvalitetsvurderinger/horizontal-bars';

const UNIT = 'saker';

const useOptions = (getAbsoluteValue: GetAbsoluteValue): ChartOptions<'bar'> => {
  const { renderBarText, tooltipCallback } = useBarTooltipText(getAbsoluteValue, UNIT);

  return {
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      y: { stacked: true },
      x: {
        beginAtZero: true,
        stacked: true,
        ticks: { callback: (label) => `${label} %` },
        title: { display: true, text: 'Omgjøringsprosent' },
      },
    },
    animation: {
      onProgress() {
        renderBarText(this.ctx);
      },
      onComplete() {
        renderBarText(this.ctx);
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: tooltipCallback,
        },
        xAlign: 'center',
        yAlign: 'top',
        caretPadding: 25,
      },
    },
  };
};

export const Omgjoeringsprosent = ({ stats }: ComparisonPropsV2) => {
  const { data: utfallMap = [] } = useUtfall();

  const relevantStats = stats.map((s) => ({
    ...s,
    data: s.data.filter(
      ({ utfallId }) =>
        utfallId !== UtfallEnum.RETUR && utfallId !== UtfallEnum.TRUKKET && utfallId !== UtfallEnum.UGUNST,
    ),
  }));

  const utfallBars = useMemo(
    () =>
      [UtfallEnum.MEDHOLD, UtfallEnum.DELVIS_MEDHOLD, UtfallEnum.OPPHEVET].map<[UtfallEnum, [number, number][]]>(
        (utfall) => [
          utfall,
          relevantStats.map<[number, number]>((s) => {
            const correctUtfall = s.data.filter((v) => v.utfallId === utfall);

            return [correctUtfall.length, (correctUtfall.length / s.data.length) * 100];
          }),
        ],
      ),
    [relevantStats],
  );

  const getAbsoluteValue: GetAbsoluteValue = (datasetIndex, dataIndex) =>
    utfallBars[datasetIndex]?.[1][dataIndex] ?? [0, 0];

  const options = useOptions(getAbsoluteValue);

  const datasets = useMemo(
    () =>
      utfallBars.map<StackedBarPiece>(([utfall, bar]) => ({
        label: utfallMap.find((u) => u.id === utfall)?.navn ?? utfall,
        data: bar.map(([, percent]) => percent),
        counts: bar.map(([count]) => count),
        backgroundColor: UTFALL_COLOR_MAP[utfall],
        barThickness: BAR_THICKNESS,
      })),
    [utfallBars, utfallMap],
  );

  const labels = relevantStats.map(({ label }, index) => {
    let count = 0;
    let percent = 0;

    for (const { counts, data } of datasets) {
      count += counts[index] ?? 0;
      percent += data[index] ?? 0;
    }

    const percentValue = Number.isNaN(percent) ? '- %' : toPercent(percent / 100);

    return `${label} (${percentValue} | ${count} ${UNIT})`;
  });

  return (
    <HorizontalBars barCount={labels.length} barThickness={BAR_THICKNESS} chartOptions={options}>
      <Bar data={{ labels, datasets }} options={options} />
    </HorizontalBars>
  );
};

const BAR_THICKNESS = 50;

interface StackedBarPieceCount {
  label: string;
  counts: number[];
}

type StackedBarPiece = StackedBarPieceCount & ChartData<'bar', number[], string>['datasets'][0];
