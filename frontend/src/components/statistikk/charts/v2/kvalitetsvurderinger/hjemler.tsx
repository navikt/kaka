import { ChartOptions } from 'chart.js';
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { VEDTAKET_COLOR_MAP } from '../../../../../colors/colors';
import { useHjemler } from '../../../../../simple-api-state/use-kodeverk';
import { IKvalitetsvurderingHjemler } from '../../../../../types/kvalitetsvurdering/v2';
import { KVALITETSVURDERING_V2_FIELD_NAMES } from '../../../../kvalitetsvurdering/kvalitetsskjema/v2/common/use-field-name';
import { ChartTitle } from '../../styled-components';
import { VedtaketReasons } from './calculations/constants';
import { DataSet } from './types';

interface Props {
  dataset: DataSet;
  hjemmelListId: keyof IKvalitetsvurderingHjemler;
  reasonId: VedtaketReasons;
  index: number;
}

export const Hjemler = ({ dataset, hjemmelListId, reasonId, index }: Props) => {
  const { data: hjemler = [] } = useHjemler();

  const data = useMemo(() => {
    const hjemlerCount = dataset.data.reduce<Record<string, number>>((counts, sak) => {
      sak[hjemmelListId]?.forEach((hjemmelId) => {
        counts[hjemmelId] = (counts[hjemmelId] ?? 0) + 1;
      });

      return counts;
    }, {});

    const top20 = Object.entries(hjemlerCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    const labels = top20.map(([id]) => hjemler.find((hjemmel) => id === hjemmel.id)?.navn ?? id);

    const datasets = [{ data: top20.map(([, value]) => value), backgroundColor: VEDTAKET_COLOR_MAP[reasonId] }];

    return { labels, datasets };
  }, [reasonId, dataset.data, hjemler, hjemmelListId]);

  return (
    <>
      <HjemlerChartTitle $index={index}>{KVALITETSVURDERING_V2_FIELD_NAMES[reasonId]}</HjemlerChartTitle>
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

const options: ChartOptions<'bar'> = {
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
  },
};
