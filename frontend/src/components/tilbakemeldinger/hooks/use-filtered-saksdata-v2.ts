import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useSaksdatalisteLederVedtaksinstans } from '@app/simple-api-state/statistics/v2/use-saksdataliste-leder-vedtaksinstans';
import { useUser } from '@app/simple-api-state/use-user';
import { ISaksdatalisteLederVedtaksinstansParamsV2 } from '@app/types/saksdata';
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

const useSaksdata = () => {
  const { data: userData } = useUser();

  // Dates
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const mangelfullt = useQueryFilters(QueryParams.MANGELFULLT);

  const query: ISaksdatalisteLederVedtaksinstansParamsV2 | typeof skipToken =
    typeof userData === 'undefined' ? skipToken : { navIdent: userData.ident, fromDate, toDate, mangelfullt };

  return useSaksdatalisteLederVedtaksinstans(query);
};

export const useFilteredSaksdataV2 = () => {
  const { data } = useSaksdata();

  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  const filtered =
    data?.searchHits.filter(
      ({ ytelseId, utfallId, hjemmelIdList }) =>
        tilbakekrevingFilter(hjemmelIdList, tilbakekreving) &&
        (ytelser.length === 0 || ytelser.includes(ytelseId)) &&
        (utfall.length === 0 || utfall.includes(utfallId)) &&
        (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
    ) ?? [];

  return filtered;
};

export const useSaksdataV2IsLoading = (): boolean => useSaksdata().isLoading;
