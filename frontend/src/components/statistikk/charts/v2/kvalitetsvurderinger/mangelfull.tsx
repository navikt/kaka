import { ChartOptions } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { MainReasonDataset } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import { KVALITETSVURDERING_TEXTS, MAIN_REASON_IDS } from '@app/components/statistikk/types/kvalitetsvurdering';
import { toPercent } from '@app/domain/number';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { HorizontalBars } from './horizontal-bars';

const BAR_THICKNESS = 50;

export interface Dataset {
  data: number[];
  counts: number[];
  backgroundColor: string[];
  barThickness: number;
}

const { Klageforberedelsen, Utredningen, Vedtaket, BrukAvRaadgivendeLege } = MainReason;

export const useData = (stats: MainReasonDataset[]) => {
  const unsortedBars = stats.flatMap(({ data, label }) =>
    [Klageforberedelsen, Utredningen, Vedtaket, BrukAvRaadgivendeLege].map((field) => ({
      label:
        stats.length > 1
          ? `${label} - ${KVALITETSVURDERING_TEXTS[field].label}`
          : KVALITETSVURDERING_TEXTS[field].label,
      data,
      color: KVALITETSVURDERING_TEXTS[field].color,
      field,
    })),
  );

  const sortedBars = MAIN_REASON_IDS.flatMap((id) => unsortedBars.filter(({ field }) => field === id));

  const calculatedData = sortedBars.map(({ data, label, color, field }) => {
    const count = data.filter((stat) => stat[field] === Radiovalg.MANGELFULLT).length;
    const percent = count / data.length;

    return { label, count, percent, color, length: data.length };
  });

  const labels = calculatedData.map(({ label, count, percent, length }) => {
    const unit = length === 1 ? 'sak' : 'saker';

    return `${label} (${toPercent(percent)} | ${count} av ${length} ${unit})`;
  });

  const backgroundColor = calculatedData.map(({ color }) => color);
  const percentages = calculatedData.map(({ percent }) => percent);
  const counts = calculatedData.map(({ count }) => count); // For testing purposes

  const datasets: Dataset[] = [{ data: percentages, counts, backgroundColor, barThickness: BAR_THICKNESS }];

  return { datasets, labels };
};

interface Props {
  datasets: MainReasonDataset[];
}

export const Mangelfull = ({ datasets }: Props) => {
  const data = useData(datasets);

  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 1,
        ticks: { callback: (label) => (typeof label === 'number' ? `${label * 100} %` : label) },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <HorizontalBars barCount={data.labels.length} chartOptions={options} barThickness={BAR_THICKNESS}>
      <Bar data={data} options={options} />
    </HorizontalBars>
  );
};
