import { ChartOptions, TooltipCallbacks } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { useRegistreringshjemlerMap } from '../../../../../simple-api-state/use-kodeverk';
import { VedtaketTextsKeys } from '../../../../../types/kvalitetsvurdering/texts/structures';
import { VEDTAKET_TEXTS } from '../../../../../types/kvalitetsvurdering/texts/texts';
import { IKvalitetsvurderingHjemler } from '../../../../../types/kvalitetsvurdering/v2';
import { ChartTitle } from '../../styled-components';
import { DataSet } from './types';

interface Props {
  dataset: DataSet;
  hjemmelListId: keyof IKvalitetsvurderingHjemler;
  reasonId: VedtaketTextsKeys;
  index: number;
}

export const Hjemler = ({ dataset, hjemmelListId, reasonId, index }: Props) => {
  const { data: hjemler = {} } = useRegistreringshjemlerMap();

  const data = useMemo(() => {
    const hjemlerCount = dataset.data.reduce<Record<string, number>>((counts, sak) => {
      sak[hjemmelListId]?.forEach((hjemmelId) => {
        counts[hjemmelId] = (counts[hjemmelId] ?? 0) + 1;
      });

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

      const name = `${hjemmel.hjemmelnavn} - ${hjemmel.lovkilde.navn}`;

      if (name.length <= 15) {
        return name;
      }

      return name.substring(0, 15);
    });

    const datasets = [{ data: top.map(([, value]) => value), backgroundColor: VEDTAKET_TEXTS[reasonId].color }];

    return { labels, datasets, ids: top.map(([id]) => id) };
  }, [reasonId, dataset.data, hjemler, hjemmelListId]);

  const tooltipCallback: TooltipCallback = ({ dataIndex, label }) => {
    const id = data.ids[dataIndex];

    if (typeof id === 'undefined') {
      return label;
    }

    const hjemmel = hjemler[id];

    if (typeof hjemmel === 'undefined') {
      return label;
    }

    return `${hjemmel.hjemmelnavn} - ${hjemmel.lovkilde.navn}`;
  };

  const options = useOptions(tooltipCallback);

  return (
    <>
      <HjemlerChartTitle $index={index}>{VEDTAKET_TEXTS[reasonId].label}</HjemlerChartTitle>
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
