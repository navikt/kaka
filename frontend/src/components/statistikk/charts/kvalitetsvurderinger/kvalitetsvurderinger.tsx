import { useAppTheme } from '@app/app-theme';
import {
  COMMON_BAR_CHART_PROPS,
  COMMON_PIE_CHART_PROPS,
  COMMON_PIE_CHART_SERIES_PROPS,
} from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { NoData } from '@app/components/echarts/no-data';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { Card } from '@app/components/statistikk/wrappers/wrappers';
import { toPercent } from '@app/domain/number';
import { CardTitle } from '@app/styled-components/cards';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { useMemo } from 'react';
import { useKvalitetsvurderingParam } from '../../hooks/use-kvalitetsvurdering-param';
import { ToggleKvalitetsvurdering } from '../../toggle-kvalitetsvurdering';
import type { StatisticsPropsV1 } from '../../types';
import { percent } from '../formatting';
import { HelpTexts } from './help-texts';
import { KVALITETSVURDERING_OPTIONS } from './kvalitetsvurdering-options';
import { MangelfulltOverTime } from './mangelfullt-over-time';

export const KvalitetsvurderingerV1 = ({ stats }: StatisticsPropsV1) => {
  const [field] = useKvalitetsvurderingParam();
  const { title, relevantReasons } = KVALITETSVURDERING_OPTIONS[field];

  const mangelfulleSaker = useMemo(() => stats.filter((stat) => stat[field] === Radiovalg.MANGELFULLT), [stats, field]);
  const braNokSaker = useMemo(() => stats.filter((stat) => stat[field] === Radiovalg.BRA), [stats, field]);

  const numberOfMangelfulleSaker = mangelfulleSaker.length;
  const totalAmountSaker = numberOfMangelfulleSaker + braNokSaker.length;

  const barLabels = relevantReasons.map(({ label }) => label);
  const barData: number[] = relevantReasons.map(
    ({ id }) => mangelfulleSaker.filter((stat) => stat[id] === true).length,
  );

  return (
    <Card rowSpan={4} className="flex flex-col gap-8">
      <CardTitle>Kvalitetsvurderinger</CardTitle>
      <TypeWarning />
      <ToggleKvalitetsvurdering />

      <div className="grid h-120 grid-cols-[1fr_3fr] gap-8">
        <BraMangelfulltPieChart
          braNokSakerCount={braNokSaker.length}
          numberOfMangelfulleSaker={numberOfMangelfulleSaker}
          totalAmountSaker={totalAmountSaker}
          title={title}
        />

        <KvalitetsavvikChart
          barLabels={barLabels}
          barData={barData}
          numberOfMangelfulleSaker={numberOfMangelfulleSaker}
          title={`Kvalitetsavviket i ${title.toLowerCase()}`}
        />
      </div>

      <MangelfulltOverTime stats={stats} title={`Kvalitetsavviket i ${title.toLowerCase()} per måned`} />

      <HelpTexts relevantReasons={relevantReasons} />
    </Card>
  );
};

interface BraMangelfulltPieChartProps {
  braNokSakerCount: number;
  numberOfMangelfulleSaker: number;
  totalAmountSaker: number;
  title: string;
}

const BraMangelfulltPieChart = ({
  braNokSakerCount,
  numberOfMangelfulleSaker,
  totalAmountSaker,
  title,
}: BraMangelfulltPieChartProps) => {
  const theme = useAppTheme();

  if (totalAmountSaker === 0) {
    return <NoData title={title} />;
  }

  return (
    <EChart
      title={title}
      option={{
        ...COMMON_PIE_CHART_PROPS,
        series: [
          {
            ...COMMON_PIE_CHART_SERIES_PROPS,
            radius: ['40%', '70%'],
            label: { show: false },
            data: [
              {
                name: `Bra / godt nok: ${percent(braNokSakerCount, totalAmountSaker)}`,
                value: braNokSakerCount,
                itemStyle: { color: getColorFromTheme(ColorToken.Success500, theme) },
              },
              {
                name: `Mangelfullt: ${percent(numberOfMangelfulleSaker, totalAmountSaker)}`,
                value: numberOfMangelfulleSaker,
                itemStyle: { color: getColorFromTheme(ColorToken.Danger600, theme) },
              },
            ],
          },
        ],
      }}
    />
  );
};

interface KvalitetsavvikChartProps {
  barLabels: string[];
  barData: number[];
  numberOfMangelfulleSaker: number;
  title: string;
}

const KvalitetsavvikChart = ({ barLabels, barData, numberOfMangelfulleSaker, title }: KvalitetsavvikChartProps) => {
  const theme = useAppTheme();

  if (barData.length === 0 || barData.every((value) => value === 0)) {
    return <NoData title={title} />;
  }

  const barColor = getColorFromTheme(ColorToken.Danger500, theme);

  const labels = barLabels
    .map((label, i) => {
      const count = barData[i] ?? 0;
      const fraction = numberOfMangelfulleSaker === 0 ? 0 : count / numberOfMangelfulleSaker;

      return `${label} (${toPercent(fraction)} | ${count} av ${numberOfMangelfulleSaker} saker)`;
    })
    .toReversed();

  const values = barData
    .map((count) => ({
      value: numberOfMangelfulleSaker === 0 ? 0 : count / numberOfMangelfulleSaker,
      itemStyle: { color: barColor },
    }))
    .toReversed();

  return (
    <EChart
      title={title}
      option={{
        ...COMMON_BAR_CHART_PROPS,
        tooltip: { show: false },
        grid: { left: 320 },
        yAxis: {
          type: 'category',
          data: labels,
          axisLabel: { width: 300, overflow: 'break', align: 'left', margin: 310 },
        },
        xAxis: { type: 'value', max: 1, axisLabel: { formatter: (value: number) => `${value * 100} %` } },
        series: [{ type: 'bar', data: values }],
      }}
    />
  );
};
