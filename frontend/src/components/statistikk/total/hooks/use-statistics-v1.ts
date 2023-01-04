import { useMemo } from 'react';
import { useStatisticsTotal } from '../../../../simple-api-state/statistics/v1/use-statistics-total';
import { IFullStatisticVurderingV1 } from '../../../../types/statistics/v1';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
} from '../../../filters/hooks/use-query-filter';
import { TilbakekrevingEnum } from '../../../filters/types';
import { tilbakekrevingFilter } from '../../filters/tilbakekreving';

const useTotalStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  return useStatisticsTotal({ fromDate, toDate });
};

export const useTotalStatisticsV1IsLoading = (): boolean => useTotalStatistics().isLoading;

const EMPTY_STATISTICS: IFullStatisticVurderingV1[] = [];

const useAllTotalStatistics = (): IFullStatisticVurderingV1[] => {
  const { data } = useTotalStatistics();

  return data?.anonymizedFinishedVurderingList ?? EMPTY_STATISTICS;
};

export const useFilteredTotalStatisticsV1 = () => {
  const data = useAllTotalStatistics();

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const enheter = useQueryFilters(QueryParams.ENHETER);
  const klageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const vedtaksinstansgrupper = useQueryFilters(QueryParams.VEDTAKSINSTANSGRUPPER);
  const tilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  return useMemo(
    () =>
      data.filter(
        ({ ytelseId, sakstypeId, utfallId, tilknyttetEnhet, vedtaksinstansEnhet, hjemmelIdList }) =>
          tilbakekrevingFilter(hjemmelIdList, tilbakekreving) &&
          (klageenheter.length === 0 || klageenheter.includes(tilknyttetEnhet)) &&
          (enheter.length === 0 || vedtaksinstansEnhet === null || enheter.includes(vedtaksinstansEnhet)) &&
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (types.length === 0 || types.includes(sakstypeId)) &&
          (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
          (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id))) &&
          (vedtaksinstansgrupper.length === 0 ||
            vedtaksinstansgrupper.some((id) => vedtaksinstansEnhet?.startsWith(id)))
      ),
    [data, tilbakekreving, klageenheter, enheter, utfall, types, ytelser, hjemler, vedtaksinstansgrupper]
  );
};
