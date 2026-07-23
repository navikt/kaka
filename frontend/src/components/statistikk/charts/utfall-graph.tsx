import { UTFALL_COLOR_MAP } from '@app/colors/colors';
import { COMMON_BAR_CHART_PROPS } from '@app/components/echarts/common-chart-props';
import { EChart } from '@app/components/echarts/echarts';
import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { useColorMap } from '@app/components/statistikk/colors/get-color';
import { isRelevantSakstype } from '@app/components/statistikk/filters/relevant';
import { toPercent } from '@app/domain/number';
import { useSakstypeToUtfall } from '@app/simple-api-state/use-kodeverk';
import { useSortedUtfall } from '@app/simple-api-state/use-utfall';
import type { SakstypeEnum } from '@app/types/sakstype';
import type { StatsDate } from '@app/types/statistics/common';
import type { UtfallEnum } from '@app/types/utfall';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import { useMemo } from 'react';

interface Stat {
  utfallId: UtfallEnum;
  sakstypeId: SakstypeEnum;
  avsluttetAvSaksbehandler: StatsDate;
}

interface Props {
  stats: Stat[];
  title: string;
}

const useSelectedUtfall = () => {
  const selectedSakstyper = useSakstypeFilter();
  const { data: sakstypeToUtfall = [] } = useSakstypeToUtfall();
  const { data: sortedUtfallKodeverk = [] } = useSortedUtfall();

  return useMemo(() => {
    const relevantUtfall = sakstypeToUtfall
      .filter(({ id }) => selectedSakstyper.includes(id))
      .flatMap(({ utfall }) => utfall);

    return sortedUtfallKodeverk.filter(({ id }) => relevantUtfall.map((u) => u.id).includes(id));
  }, [selectedSakstyper, sakstypeToUtfall, sortedUtfallKodeverk]);
};

export const UtfallGraph = ({ stats: allStats, title }: Props) => {
  const selectedUtfall = useSelectedUtfall();
  const colorMap = useColorMap();

  const relevantStats = useMemo(
    () =>
      allStats.filter(
        ({ avsluttetAvSaksbehandler, sakstypeId }) =>
          avsluttetAvSaksbehandler !== null && isRelevantSakstype(sakstypeId),
      ),
    [allStats],
  );

  const total = allStats.length;

  const { data, labels } = useMemo(() => {
    const rows = selectedUtfall.map(({ id, navn }) => ({
      label: navn,
      value: relevantStats.filter(({ utfallId }) => utfallId === id).length,
      color: colorMap[UTFALL_COLOR_MAP[id]],
    }));

    // Echarts renders category axis items bottom-to-top, so reverse here to get the expected top-to-bottom order.
    const reversed = rows.toReversed();

    return {
      data: reversed.map(({ value, color }) => ({ value, itemStyle: { color } })),
      labels: reversed.map(({ label }) => label),
    };
  }, [selectedUtfall, relevantStats, colorMap]);

  return (
    <EChart
      title={title}
      option={{
        ...COMMON_BAR_CHART_PROPS,
        yAxis: { type: 'category', data: labels },
        xAxis: { type: 'value', axisLabel: { formatter: (value: number) => toPercent(value / total) } },
        series: [{ data, type: 'bar' }],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: (params: CallbackDataParams | CallbackDataParams[]) => {
            const [param] = Array.isArray(params) ? params : [params];
            const value = typeof param?.value === 'number' ? param.value : undefined;

            return value === undefined
              ? `${param?.name}: Ukjent`
              : `${param?.name}: ${toPercent(value / total)} (${value})`;
          },
        },
      }}
    />
  );
};
