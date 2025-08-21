import { useColor } from '@app/components/statistikk/colors/get-color';
import {
  type StatisticsVedtaketHjemlerList,
  type StatisticsVedtaketHjemlerListBoolean,
  VEDTAKET_TEXTS,
} from '@app/components/statistikk/types/vedtaket';
import { useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type { ChartOptions, TooltipCallbacks } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { styled } from 'styled-components';
import { ChartTitle } from '../../styled-components';
import type { DataSet } from './types';

interface Props {
  dataset: DataSet;
  hjemmelListId: StatisticsVedtaketHjemlerList;
  reasonId: StatisticsVedtaketHjemlerListBoolean;
  index: number;
  label: React.ReactNode;
}

export const Hjemler = ({ dataset, hjemmelListId, reasonId, label, index }: Props) => {
  const { data: hjemler = {} } = useRegistreringshjemlerMap();
  const backgroundColor = useColor(VEDTAKET_TEXTS[reasonId].color);

  const data = useMemo(() => {
    const hjemlerCount = dataset.data.reduce<Record<string, number>>((counts, sak) => {
      for (const hjemmelId of sak[hjemmelListId] ?? []) {
        counts[hjemmelId] = (counts[hjemmelId] ?? 0) + 1;
      }

      return counts;
    }, {});

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
  }, [dataset.data, hjemler, hjemmelListId, backgroundColor]);

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
    <>
      <HjemlerChartTitle $index={index}>{label}</HjemlerChartTitle>
      <ChartContainer $index={index}>
        <Bar options={options} data={data} />
      </ChartContainer>
    </>
  );
};

const HjemlerChartTitle = styled(ChartTitle)<{ $index: number }>`
  grid-area: title-${({ $index }) => $index};
`;

const ChartContainer = styled.div<{ $index: number }>`
  position: relative;
  grid-area: chart-${({ $index }) => $index};
`;

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
