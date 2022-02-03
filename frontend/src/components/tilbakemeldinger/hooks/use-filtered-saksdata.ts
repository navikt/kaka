import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useGetSaksdatalisteLederFoersteinstansQuery } from '../../../redux-api/statistics';
import { ISaksdatalisteLederFoersteinstansParams } from '../../../types/saksdata';
import { QueryParams } from '../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../filters/hooks/use-query-filter';

const useSaksdata = () => {
  const { data: userData } = useGetUserDataQuery();
  // Dates
  const fromDate = useFromDateQueryFilter();
  const toDate = useToDateQueryFilter();

  const mangelfullt = useQueryFilters(QueryParams.MANGELFULLT);
  const kommentarer = useQueryFilters(QueryParams.KOMMENTARER);

  const query: ISaksdatalisteLederFoersteinstansParams | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : { navIdent: userData.ident, fromDate, toDate, mangelfullt, kommentarer };
  return useGetSaksdatalisteLederFoersteinstansQuery(query, { pollingInterval: 3 * 60 * 1000 });
};

export const useFilteredSaksdata = () => {
  const { data } = useSaksdata();

  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);

  const filtered =
    data?.searchHits.filter(
      ({ ytelseId, utfallId, hjemmelIdList }) =>
        (ytelser.length === 0 || ytelser.includes(ytelseId)) &&
        (utfall.length === 0 || utfall.includes(utfallId)) &&
        (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
    ) ?? [];

  return filtered;
};

export const useSaksdataIsLoading = (): boolean => useSaksdata().isLoading;
