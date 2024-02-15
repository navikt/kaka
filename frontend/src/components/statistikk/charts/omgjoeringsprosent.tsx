import { ChartOptions } from 'chart.js';
import React from 'react';
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

const useData = (stats: ComparisonPropsV2['stats']) => {
  const { data: utfallMap = [] } = useUtfall();

  const datasets = [UtfallEnum.MEDHOLD, UtfallEnum.DELVIS_MEDHOLD, UtfallEnum.OPPHEVET].map((utfall) => {
    const { data, counts } = stats.reduce<{ data: number[]; counts: number[] }>(
      (acc, curr) => {
        const count = curr.data.filter(({ utfallId }) => utfallId === utfall).length;

        return {
          data: [...acc.data, (count / curr.data.length) * 100],
          counts: [...acc.counts, count],
        };
      },
      { data: [], counts: [] },
    );

    return {
      label: utfallMap.find((u) => u.id === utfall)?.navn ?? utfall,
      data,
      counts,
      backgroundColor: UTFALL_COLOR_MAP[utfall],
      barThickness: BAR_THICKNESS,
    };
  });

  const labels = stats.map(({ label, data: relevantData }, index) => {
    let count = 0;
    let percent = 0;

    for (const { data, counts } of datasets) {
      count += counts[index] ?? 0;
      percent += data[index] ?? 0;
    }

    return `${label} (${toPercent(percent / 100)} | ${count} av ${relevantData.length} ${UNIT})`;
  });

  return { datasets, labels };
};

export const Omgjoeringsprosent = ({ stats }: ComparisonPropsV2) => {
  const { datasets, labels } = useData(stats);

  const getAbsoluteValue: GetAbsoluteValue = (datasetIndex, dataIndex) => {
    const count = datasets[datasetIndex]?.counts[dataIndex] ?? 0;
    const percent = datasets[datasetIndex]?.data[dataIndex] ?? 0;

    return [count, percent];
  };
  const options = useOptions(getAbsoluteValue);

  return (
    <HorizontalBars barCount={labels.length} barThickness={BAR_THICKNESS} chartOptions={options}>
      <Bar data={{ labels, datasets }} options={options} />
    </HorizontalBars>
  );
};

const BAR_THICKNESS = 50;
