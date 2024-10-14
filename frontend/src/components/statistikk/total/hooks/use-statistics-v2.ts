import type { State } from '@app/simple-api-state/simple-api-state';
import { useStatisticsTotal } from '@app/simple-api-state/statistics/v2/use-statistics-total';
import type { IFullStatisticVurderingV2, IStatisticsResponseTotalV2 } from '@app/types/statistics/v2';
import { useMemo } from 'react';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
  useVedtaksinstansgruppeQueryFilter,
} from '../../../filters/hooks/use-query-filter';
import { TilbakekrevingEnum } from '../../../filters/types';
import { tilbakekrevingFilter } from '../../filters/tilbakekreving';

const useTotalStatistics = (): State<IStatisticsResponseTotalV2> => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  return useStatisticsTotal({ fromDate, toDate });
};

export const useTotalStatisticsV2IsLoading = (): boolean => useTotalStatistics().isLoading;

const EMPTY_STATISTICS: IFullStatisticVurderingV2[] = [];

export const useFilteredTotalStatisticsV2 = () => {
  const { data } = useTotalStatistics();

  const rest = data?.rest ?? EMPTY_STATISTICS;

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const enheter = useQueryFilters(QueryParams.ENHETER);
  const klageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const vedtaksinstansgrupper = useVedtaksinstansgruppeQueryFilter();
  const tilbakekrevingQuery = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  return useMemo(
    () =>
      rest.filter(
        ({
          ytelseId,
          sakstypeId,
          utfallId,
          tilknyttetEnhet,
          vedtaksinstansEnhet,
          hjemmelIdList,
          vedtaksinstansgruppe,
          tilbakekreving,
        }) =>
          tilbakekrevingFilter(tilbakekreving, tilbakekrevingQuery) &&
          (klageenheter.length === 0 || klageenheter.includes(tilknyttetEnhet)) &&
          (enheter.length === 0 || vedtaksinstansEnhet === null || enheter.includes(vedtaksinstansEnhet)) &&
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (types.length === 0 || types.includes(sakstypeId)) &&
          (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
          (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id))) &&
          (vedtaksinstansgrupper.length === 0 || vedtaksinstansgrupper.includes(vedtaksinstansgruppe)),
      ),
    [rest, tilbakekrevingQuery, klageenheter, enheter, utfall, types, ytelser, hjemler, vedtaksinstansgrupper],
  );
};
