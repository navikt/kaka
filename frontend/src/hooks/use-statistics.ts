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
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const types = searchParams.get(QueryParams.TYPES)?.split(',') ?? [];
    const ytelser = searchParams.get(QueryParams.YTELSER)?.split(',') ?? [];
    const enheter = searchParams.get(QueryParams.ENHETER)?.split(',') ?? [];

    return data.filter(
      ({ ytelseId, sakstypeId, tilknyttetEnhet }) =>
        (enheter.length === 0 || enheter.includes(tilknyttetEnhet)) &&
        (types.length === 0 || types.includes(sakstypeId)) &&
        (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId))
    );
  }, [data, searchParams]);
};

export const useFilteredFinishedStatistics = () => {
  const data = useFilteredStatistics();
  return useMemo(() => data.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null), [data]);
};
