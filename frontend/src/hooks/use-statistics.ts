import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../components/oversikt/types';
import { useGetStatisticsQuery } from '../redux-api/statistics';
import { IStatisticVurdering } from '../types/statistics';

export const useStatistics = () => {
  const [searchParams] = useSearchParams();
  const year = searchParams.get(QueryParams.YEAR) ?? new Date().getFullYear().toString();
  return useGetStatisticsQuery({ year }, { pollingInterval: 3 * 60 * 1000 });
};

export const useAllStatistics = (): IStatisticVurdering[] => {
  const { data } = useStatistics();

  return data?.anonymizedVurderingList ?? [];
};

export const useFilteredStatistics = () => {
  const data = useAllStatistics();
  const [params] = useSearchParams();

  return useMemo(() => {
    const types = params.get(QueryParams.TYPES)?.split(',') ?? [];
    const ytelser = params.get(QueryParams.YTELSER)?.split(',') ?? [];
    const enheter = params.get(QueryParams.ENHETER)?.split(',') ?? [];

    return data.filter(
      ({ ytelseId, sakstypeId, tilknyttetEnhet }) =>
        (enheter.length === 0 || enheter.includes(tilknyttetEnhet)) &&
        (types.length === 0 || types.includes(sakstypeId)) &&
        (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId))
    );
  }, [data, params]);
};
