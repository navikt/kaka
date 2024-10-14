import { useStatisticsVedtaksinstansleder } from '@app/simple-api-state/statistics/v1/use-statistics-vedtaksinstansleder';
import { SakstypeEnum } from '@app/types/sakstype';
import type { IStatisticVurderingV1 } from '@app/types/statistics/v1';
import { useCallback, useMemo } from 'react';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../filters/date-presets/constants';
import { QueryParams } from '../../filters/filter-query-params';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
} from '../../filters/hooks/use-query-filter';
import { TilbakekrevingEnum } from '../../filters/types';
import { tilbakekrevingFilter } from '../../statistikk/filters/tilbakekreving';

const useStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const mangelfullt = useQueryFilters(QueryParams.MANGELFULLT);
  const kommentarer = useQueryFilters(QueryParams.KOMMENTARER);

  return useStatisticsVedtaksinstansleder({ fromDate, toDate, mangelfullt, kommentarer });
};

export const useTilbakemeldingerStatisticsV1IsLoading = (): boolean => useStatistics().isLoading;

const EMPTY_ARRAY: IStatisticVurderingV1[] = [];

export const useFilteredStatisticsV1 = () => {
  const { data } = useStatistics();

  const mine = useMemo(() => data?.mine ?? EMPTY_ARRAY, [data]);
  const rest = useMemo(() => data?.rest ?? EMPTY_ARRAY, [data]);

  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekrevingQuery = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  const filter = useCallback(
    ({ sakstypeId, ytelseId, utfallId, hjemmelIdList, tilbakekreving }: IStatisticVurderingV1) =>
      sakstypeId === SakstypeEnum.KLAGE &&
      tilbakekrevingFilter(tilbakekreving, tilbakekrevingQuery) &&
      (utfall.length === 0 || utfall.includes(utfallId)) &&
      (ytelser.length === 0 || ytelser.includes(ytelseId)) &&
      (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id))),
    [tilbakekrevingQuery, utfall, ytelser, hjemler],
  );

  return useMemo(
    () => ({
      mine: mine.filter(filter),
      rest: rest.filter(filter),
    }),
    [mine, filter, rest],
  );
};
