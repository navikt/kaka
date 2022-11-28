import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetSaksdatalisteLederVedtaksinstansQuery } from '../../../redux-api/statistics';
import { useUser } from '../../../simple-api-state/use-user';
import { ISaksdatalisteLederVedtaksinstansParams } from '../../../types/saksdata';
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
  const kommentarer = useQueryFilters(QueryParams.KOMMENTARER);

  const query: ISaksdatalisteLederVedtaksinstansParams | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : { navIdent: userData.ident, fromDate, toDate, mangelfullt, kommentarer };

  return useGetSaksdatalisteLederVedtaksinstansQuery(query, { pollingInterval: 3 * 60 * 1000 });
};

export const useFilteredSaksdata = () => {
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

export const useSaksdataIsLoading = (): boolean => useSaksdata().isLoading;
