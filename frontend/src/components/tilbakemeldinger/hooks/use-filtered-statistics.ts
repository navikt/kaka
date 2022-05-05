import { useMemo } from 'react';
import { useGetVedtaksinstanslederStatisticsQuery } from '../../../redux-api/statistics';
import { SakstypeEnum } from '../../../types/sakstype';
import { IStatisticVurdering } from '../../../types/statistics';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../filters/date-presets/constants';
import { QueryParams } from '../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../filters/hooks/use-query-filter';

const useStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const mangelfullt = useQueryFilters(QueryParams.MANGELFULLT);
  const kommentarer = useQueryFilters(QueryParams.KOMMENTARER);

  return useGetVedtaksinstanslederStatisticsQuery(
    { fromDate, toDate, mangelfullt, kommentarer },
    { pollingInterval: 3 * 60 * 1000 }
  );
};

export const useStatisticsIsLoading = (): boolean => useStatistics().isLoading;

const useAllStatistics = (): IStatisticVurdering[] => {
  const { data } = useStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredStatistics = () => {
  const stats = useAllStatistics();

  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);

  return useMemo(
    () =>
      stats.filter(
        ({ sakstypeId, ytelseId, utfallId, hjemmelIdList }) =>
          sakstypeId === SakstypeEnum.KLAGE &&
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (ytelser.length === 0 || ytelser.includes(ytelseId)) &&
          (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
      ),
    [stats, ytelser, utfall, hjemler]
  );
};
