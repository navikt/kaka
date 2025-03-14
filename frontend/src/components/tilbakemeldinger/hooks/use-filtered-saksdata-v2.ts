import { useSaksdatalisteLederVedtaksinstans } from '@app/simple-api-state/statistics/v2/use-saksdataliste-leder-vedtaksinstans';
import { useUser } from '@app/simple-api-state/use-user';
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
  const userData = useUser();

  // Dates
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const mangelfullt = useQueryFilters(QueryParams.MANGELFULLT);

  return useSaksdatalisteLederVedtaksinstans({ navIdent: userData.ident, fromDate, toDate, mangelfullt });
};

export const useFilteredSaksdataV2 = () => {
  const { data } = useSaksdata();

  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekrevingQuery = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  const filtered =
    data?.searchHits.filter(
      ({ ytelseId, utfallId, hjemmelIdList, tilbakekreving }) =>
        tilbakekrevingFilter(tilbakekreving, tilbakekrevingQuery) &&
        (ytelser.length === 0 || ytelser.includes(ytelseId)) &&
        (utfall.length === 0 || utfall.includes(utfallId)) &&
        (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id))),
    ) ?? [];

  return filtered;
};

export const useSaksdataV2IsLoading = (): boolean => useSaksdata().isLoading;
