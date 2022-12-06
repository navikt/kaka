import { useMemo } from 'react';
import { useStatisticsVedtaksinstansleder } from '../../../simple-api-state/statistics/v1/use-statistics-vedtaksinstansleder';
import { SakstypeEnum } from '../../../types/sakstype';
import { IStatisticVurdering } from '../../../types/statistics/v1';
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

const useAllStatistics = (): IStatisticVurdering[] => {
  const { data } = useStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredStatistics = () => {
  const stats = useAllStatistics();

  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  return useMemo(
    () =>
      stats.filter(
        ({ sakstypeId, ytelseId, utfallId, hjemmelIdList }) =>
          sakstypeId === SakstypeEnum.KLAGE &&
          tilbakekrevingFilter(hjemmelIdList, tilbakekreving) &&
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (ytelser.length === 0 || ytelser.includes(ytelseId)) &&
          (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
      ),
    [stats, tilbakekreving, utfall, ytelser, hjemler]
  );
};
