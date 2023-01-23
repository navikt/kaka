import { skipToken } from '@reduxjs/toolkit/query/react';
import { useCallback, useMemo } from 'react';
import { useStatisticsManager } from '../../../../simple-api-state/statistics/v2/use-statistics-manager';
import { useUser } from '../../../../simple-api-state/use-user';
import { IFullStatisticVurderingV2, IManagerStatisticsQuery } from '../../../../types/statistics/v2';
import { FORMATTED_END_OF_LAST_MONTH, FORMATTED_START_OF_LAST_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromMonthQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToMonthQueryFilter,
} from '../../../filters/hooks/use-query-filter';
import { TilbakekrevingEnum } from '../../../filters/types';
import { tilbakekrevingFilter } from '../../filters/tilbakekreving';

const useStatistics = () => {
  const { data: userData } = useUser();
  const fromMonth = useFromMonthQueryFilter(FORMATTED_START_OF_LAST_MONTH);
  const toMonth = useToMonthQueryFilter(FORMATTED_END_OF_LAST_MONTH);

  const saksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);

  const query: IManagerStatisticsQuery | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : { fromMonth, toMonth, saksbehandlere, enhetId: userData.ansattEnhet.id };

  return useStatisticsManager(query);
};

export const useManagerStatisticsV2IsLoading = (): boolean => useStatistics().isLoading;

const EMPTY_ARRAY: IFullStatisticVurderingV2[] = [];
const EMPTY_SAKSBEHANDLERE: Record<string, IFullStatisticVurderingV2[]> = {};

export const useFilteredManagerStatisticsV2 = () => {
  const { data } = useStatistics();

  const mine = useMemo(() => data?.mine ?? EMPTY_ARRAY, [data]);
  const rest = useMemo(() => data?.rest ?? EMPTY_ARRAY, [data]);
  const saksbehandlere = useMemo(() => data?.saksbehandlere ?? EMPTY_SAKSBEHANDLERE, [data]);

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const klageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  const filter = useCallback(
    () =>
      ({ ytelseId, sakstypeId, utfallId, tilknyttetEnhet, hjemmelIdList }: IFullStatisticVurderingV2) =>
        tilbakekrevingFilter(hjemmelIdList, tilbakekreving) &&
        (klageenheter.length === 0 || klageenheter.includes(tilknyttetEnhet)) &&
        (utfall.length === 0 || utfall.includes(utfallId)) &&
        (types.length === 0 || types.includes(sakstypeId)) &&
        (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
        (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id))),
    [hjemler, klageenheter, tilbakekreving, types, utfall, ytelser]
  );

  return useMemo(
    () => ({
      mine: mine.filter(filter),
      rest: rest.filter(filter),
      saksbehandlere: Object.entries(saksbehandlere).reduce<Record<string, IFullStatisticVurderingV2[]>>(
        (acc, [saksbehandler, vurderinger]) => ({ ...acc, [saksbehandler]: vurderinger }),
        {}
      ),
    }),
    [mine, filter, rest, saksbehandlere]
  );
};
