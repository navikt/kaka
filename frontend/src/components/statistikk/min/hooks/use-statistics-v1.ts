import { filterHjemler } from '@app/components/statistikk/filters/filter-hjemler';
import { useStatisticsMy } from '@app/simple-api-state/statistics/v1/use-statistics-my';
import type { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { useCallback, useMemo } from 'react';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromDateQueryFilter,
  useHjemlerModeFilter,
  useQueryFilters,
  useSakstypeFilter,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
} from '../../../filters/hooks/use-query-filter';
import { HjemlerModeFilter, TilbakekrevingEnum } from '../../../filters/types';
import { tilbakekrevingFilter } from '../../filters/tilbakekreving';

const useStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  return useStatisticsMy({ fromDate, toDate });
};

export const useMyStatisticsV1IsLoading = (): boolean => useStatistics().isLoading;

const EMPTY_ARRAY: IFullStatisticVurderingV1[] = [];

export const useFilteredMyStatisticsV1 = () => {
  const { data } = useStatistics();

  const mine = useMemo(() => data?.mine ?? EMPTY_ARRAY, [data]);
  const rest = useMemo(() => data?.rest ?? EMPTY_ARRAY, [data]);

  const types = useSakstypeFilter();
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekrevingQuery = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);
  const hjemlerMode = useHjemlerModeFilter(HjemlerModeFilter.INCLUDE_FOR_SOME);

  const filter = useCallback(
    ({ ytelseId, sakstypeId, utfallId, hjemmelIdList, tilbakekreving }: IFullStatisticVurderingV1) =>
      tilbakekrevingFilter(tilbakekreving, tilbakekrevingQuery) &&
      (utfall.length === 0 || utfall.includes(utfallId)) &&
      (types.length === 0 || types.includes(sakstypeId)) &&
      (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
      filterHjemler(hjemmelIdList, hjemler, hjemlerMode),
    [hjemler, tilbakekrevingQuery, types, utfall, ytelser, hjemlerMode],
  );

  return useMemo(() => ({ mine: mine.filter(filter), rest: rest.filter(filter) }), [mine, filter, rest]);
};
