import { useMemo } from 'react';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useGetTotalStatisticsQuery } from '../../../redux-api/statistics';
import { SakstypeEnum } from '../../../types/sakstype';
import { IStatisticVurdering } from '../../../types/statistics';
import { QueryParams } from '../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../filters/hooks/use-query-filter';

const useTotalStatistics = () => {
  const fromDate = useFromDateQueryFilter();
  const toDate = useToDateQueryFilter();
  return useGetTotalStatisticsQuery({ fromDate, toDate }, { pollingInterval: 3 * 60 * 1000 });
};

export const useTotalStatisticsIsLoading = (): boolean => useTotalStatistics().isLoading;

const useAllTotalStatistics = (): IStatisticVurdering[] => {
  const { data } = useTotalStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredTotalStatistics = () => {
  const stats = useAllTotalStatistics();
  const { data } = useGetUserDataQuery();

  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);

  return useMemo(() => {
    if (typeof data?.ansattEnhet.navn === 'undefined') {
      return [];
    }

    return stats.filter(
      ({ sakstypeId, ytelseId, utfallId, hjemmelIdList, vedtaksinstansEnhet }) =>
        sakstypeId === SakstypeEnum.KLAGE &&
        vedtaksinstansEnhet === data.ansattEnhet.navn &&
        (utfall.length === 0 || utfall.includes(utfallId)) &&
        (ytelser.length === 0 || ytelser.includes(ytelseId)) &&
        (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
    );
  }, [data?.ansattEnhet.navn, stats, ytelser, utfall, hjemler]);
};
