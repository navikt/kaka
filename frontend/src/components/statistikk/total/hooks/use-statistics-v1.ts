import { filterHjemler } from '@app/components/statistikk/filters/filter-hjemler';
import { useYtelserQueryFilter } from '@app/components/statistikk/hooks/use-ytelser-query-filter';
import { useStatisticsTotal } from '@app/simple-api-state/statistics/v1/use-statistics-total';
import type { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { useMemo } from 'react';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromDateQueryFilter,
  useHjemlerModeFilter,
  useQueryFilters,
  useSakstypeFilter,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
  useVedtaksinstansgruppeQueryFilter,
} from '../../../filters/hooks/use-query-filter';
import { HjemlerModeFilter, TilbakekrevingEnum } from '../../../filters/types';
import { tilbakekrevingFilter } from '../../filters/tilbakekreving';

const useTotalStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  return useStatisticsTotal({ fromDate, toDate });
};

export const useTotalStatisticsV1IsLoading = (): boolean => useTotalStatistics().isLoading;

const EMPTY_STATISTICS: IFullStatisticVurderingV1[] = [];

export const useFilteredTotalStatisticsV1 = () => {
  const { data } = useTotalStatistics();

  const rest = data?.rest ?? EMPTY_STATISTICS;

  const types = useSakstypeFilter();
  const ytelser = useYtelserQueryFilter();
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const enheter = useQueryFilters(QueryParams.ENHETER);
  const klageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const vedtaksinstansgrupper = useVedtaksinstansgruppeQueryFilter();
  const tilbakekrevingQuery = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);
  const hjemlerMode = useHjemlerModeFilter(HjemlerModeFilter.INCLUDE_FOR_SOME);

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
          filterHjemler(hjemmelIdList, hjemler, hjemlerMode) &&
          (vedtaksinstansgrupper.length === 0 || vedtaksinstansgrupper.includes(vedtaksinstansgruppe)),
      ),
    [
      rest,
      tilbakekrevingQuery,
      klageenheter,
      enheter,
      utfall,
      types,
      ytelser,
      hjemler,
      vedtaksinstansgrupper,
      hjemlerMode,
    ],
  );
};
