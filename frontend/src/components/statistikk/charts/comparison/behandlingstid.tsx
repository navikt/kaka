import { ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { NAV_COLORS } from '@app/colors/colors';
import { ISaksdata } from '@app/types/statistics/common';
import { HorizontalBars } from '../v2/kvalitetsvurderinger/horizontal-bars';

const BAR_THICKNESS = 50;

const useOptions = (): ChartOptions<'bar'> => ({
  maintainAspectRatio: false,
  aspectRatio: 3,
  indexAxis: 'y',
  scales: {
    y: { stacked: true },
    x: {
      title: { display: true, text: 'Behandlingstid (dager)' },
    },
  },
});

type Data = Pick<
  ISaksdata,
  'avsluttetAvSaksbehandler' | 'vedtaksinstansBehandlingstidDays' | 'kaBehandlingstidDays' | 'totalBehandlingstidDays'
>;

interface Stat {
  label: string;
  data: Data[];
  color: string;
}

interface Props {
  stats: Stat[];
}

export const BehandlingstidComparison = ({ stats }: Props) => {
  const options = useOptions();

  const [vedtaksinstansData, klageinstansData] = useMemo(() => {
    const vedtaksinstans: number[] = [];
    const klageinstans: number[] = [];

    for (const { data } of stats) {
      let vedtakSum = 0;
      let klageSum = 0;

      for (const { vedtaksinstansBehandlingstidDays, kaBehandlingstidDays } of data) {
        vedtakSum += vedtaksinstansBehandlingstidDays;
        klageSum += kaBehandlingstidDays;
      }

      const noData = data.length === 0;
      const zeroVedtakSum = vedtakSum === 0;
      const zeroKlageSum = klageSum === 0;

      vedtaksinstans.push(noData || zeroVedtakSum ? 0 : Math.round(vedtakSum / data.length));
      klageinstans.push(noData || zeroKlageSum ? 0 : Math.round(klageSum / data.length));
    }

    return [vedtaksinstans, klageinstans];
  }, [stats]);

  const labels = useMemo(
    () => stats.map((stat, i) => `${stat.label} (totalt ${(vedtaksinstansData[i] ?? 0) + (klageinstansData[i] ?? 0)})`),
    [klageinstansData, stats, vedtaksinstansData],
  );

  const datasets = [
    {
      label: 'Vedtaksinstans',
      data: vedtaksinstansData,
      backgroundColor: NAV_COLORS.lightblue[500],
      borderColor: NAV_COLORS.lightblue[500],
    },
    {
      label: 'Klageinstans',
      data: klageinstansData,
      backgroundColor: NAV_COLORS.purple[500],
      borderColor: NAV_COLORS.purple[500],
    },
  ];

  return (
    <HorizontalBars barCount={labels.length} barThickness={BAR_THICKNESS} chartOptions={options}>
      <Bar options={options} data={{ datasets, labels }} />
    </HorizontalBars>
  );
};
