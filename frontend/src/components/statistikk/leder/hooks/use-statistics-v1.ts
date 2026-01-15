import { filterHjemler } from '@app/components/statistikk/filters/filter-hjemler';
import { useYtelserQueryFilter } from '@app/components/statistikk/hooks/use-ytelser-query-filter';
import { useStatisticsManager } from '@app/simple-api-state/statistics/v1/use-statistics-manager';
import { useUser } from '@app/simple-api-state/use-user';
import type { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { useCallback, useMemo } from 'react';
import { FORMATTED_END_OF_LAST_MONTH, FORMATTED_START_OF_LAST_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromMonthQueryFilter,
  useHjemlerModeFilter,
  useQueryFilters,
  useSakstypeFilter,
  useTilbakekrevingQueryFilter,
  useToMonthQueryFilter,
} from '../../../filters/hooks/use-query-filter';
import { HjemlerModeFilter, TilbakekrevingEnum } from '../../../filters/types';
import { tilbakekrevingFilter } from '../../filters/tilbakekreving';

const useStatistics = () => {
  const userData = useUser();
  const fromMonth = useFromMonthQueryFilter(FORMATTED_START_OF_LAST_MONTH);
  const toMonth = useToMonthQueryFilter(FORMATTED_END_OF_LAST_MONTH);
  const saksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);

  return useStatisticsManager({ fromMonth, toMonth, saksbehandlere, enhetId: userData.ansattEnhet.id });
};

export const useManagerStatisticsV1IsLoading = (): boolean => useStatistics().isLoading;

const EMPTY_ARRAY: IFullStatisticVurderingV1[] = [];
const EMPTY_SAKSBEHANDLERE: Record<string, IFullStatisticVurderingV1[]> = {};

export const useFilteredManagerStatisticsV1 = () => {
  const { data } = useStatistics();

  const mine = useMemo(() => data?.mine ?? EMPTY_ARRAY, [data]);
  const rest = useMemo(() => data?.rest ?? EMPTY_ARRAY, [data]);
  const saksbehandlere = useMemo(() => data?.saksbehandlere ?? EMPTY_SAKSBEHANDLERE, [data]);

  const types = useSakstypeFilter();
  const ytelser = useYtelserQueryFilter();
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

  return useMemo(
    () => ({
      mine: mine.filter(filter),
      rest: rest.filter(filter),
      saksbehandlere: Object.entries(saksbehandlere).reduce<Record<string, IFullStatisticVurderingV1[]>>(
        (acc, [saksbehandler, vurderinger]) => {
          acc[saksbehandler] = vurderinger.filter(filter);
          return acc;
        },
        {},
      ),
    }),
    [mine, filter, rest, saksbehandlere],
  );
};
