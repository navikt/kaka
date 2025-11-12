import { useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type { ChartOptions, TooltipCallbacks } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartTitle } from '../styled-components';

interface Props {
  hjemlerCount: Record<string, number>;
  backgroundColor: string;
  label: React.ReactNode;
}

export const Hjemler = ({ hjemlerCount, backgroundColor, label }: Props) => {
  const { data: hjemler = {} } = useRegistreringshjemlerMap();
  const data = useMemo(() => {
    const top = Object.entries(hjemlerCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = top.map(([id]) => {
      const hjemmel = hjemler[id];

      if (typeof hjemmel === 'undefined') {
        return id;
      }

      const name = `${hjemmel.hjemmelnavn} - ${hjemmel.lovkilde.beskrivelse}`;

      if (name.length <= 15) {
        return name;
      }

      return name.substring(0, 15);
    });

    const datasets = [{ data: top.map(([, value]) => value), backgroundColor }];

    return { labels, datasets, ids: top.map(([id]) => id) };
  }, [hjemlerCount, hjemler, backgroundColor]);

  const tooltipCallback: TooltipCallback = ({ dataIndex, label: tooltip }) => {
    const id = data.ids[dataIndex];

    if (typeof id === 'undefined') {
      return tooltip;
    }

    const hjemmel = hjemler[id];

    if (typeof hjemmel === 'undefined') {
      return tooltip;
    }

    return `${hjemmel.hjemmelnavn} - ${hjemmel.lovkilde.navn}`;
  };

  const options = useOptions(tooltipCallback);

  return (
    <div>
      <ChartTitle>{label}</ChartTitle>
      <Bar options={options} data={data} />
    </div>
  );
};

type TooltipCallback = TooltipCallbacks<'bar'>['label'];

const useOptions = (tooltipCallback?: TooltipCallback): ChartOptions<'bar'> => ({
  indexAxis: 'y',
  aspectRatio: 1,
  scales: {
    y: {
      beginAtZero: true,
      bounds: 'ticks',
      min: 0,
    },
    x: {
      ticks: { stepSize: 1 },
      title: { display: true, text: 'Antall saker' },
    },
  },
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { callbacks: { label: tooltipCallback } },
  },
});
