import { useColor } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type { ChartOptions, TooltipCallbacks } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

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
    x: { ticks: { stepSize: 1 } },
  },
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: { display: false },
    tooltip: {
      callbacks: { label: tooltipCallback },
    },
  },
});

interface Stat {
  hjemmelIdList: string[];
}

interface Props {
  stats: Stat[];
}

interface RegistreringshjemmelWithLabel {
  id: string;
  label: string;
}

interface RegistreringshjemmelWithTooltip {
  id: string;
  tooltip: string;
}

const useLabelledRegistreringshjemler = () => {
  const { data: hjemlerMap = {} } = useRegistreringshjemlerMap();

  return useMemo(() => {
    const withIdKey: Record<string, RegistreringshjemmelWithLabel> = {};
    const withLabelKey: Record<string, RegistreringshjemmelWithTooltip> = {};

    for (const key of Object.keys(hjemlerMap)) {
      const found = hjemlerMap[key];

      if (found) {
        const label = `${found.hjemmelnavn} - ${found.lovkilde.beskrivelse}`;
        const tooltip = `${found.hjemmelnavn} - ${found.lovkilde.navn}`;

        withIdKey[key] = { id: key, label };
        withLabelKey[label] = { id: key, tooltip };
      }
    }

    return { withIdKey, withLabelKey };
  }, [hjemlerMap]);
};

export const Hjemler = ({ stats }: Props) => {
  const { withIdKey, withLabelKey } = useLabelledRegistreringshjemler();
  const color = useColor(ColorToken.Accent500);

  const tooltipCallback: TooltipCallback = ({ parsed, label }) => {
    const found = withLabelKey[label];

    return found ? `${found.tooltip}: ${parsed.x}` : `${label}: ${parsed.x}`;
  };

  const options = useOptions(tooltipCallback);

  const hjemmelStats = useMemo(
    () =>
      stats.reduce((acc, stat) => {
        for (const hjemmelId of stat.hjemmelIdList) {
          acc.set(hjemmelId, (acc.get(hjemmelId) ?? 0) + 1);
        }

        return acc;
      }, new Map<string, number>()),
    [stats],
  );

  const barData = useMemo(() => {
    const top20 = Array.from(hjemmelStats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    const labels = top20
      .map(([key]) => key)
      .map((hjemmelId) => {
        const found = withIdKey[hjemmelId];

        return found === undefined ? hjemmelId : found.label;
      });

    const data = top20.map(([, value]) => value);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: color,
          borderColor: color,
        },
      ],
    };
  }, [hjemmelStats, withIdKey, color]);

  return <Bar options={options} data={barData} />;
};
