import { useCallback, useMemo } from 'react';
import { useStatisticsTotal } from '../../../../simple-api-state/statistics/v2/use-statistics-total';
import { OptionValue } from '../../../../types/statistics/common';
import { IComparedFullStatisticVurderingV2, IFullStatisticVurderingV2 } from '../../../../types/statistics/v2';
import { AVERAGE, REST } from '../../../filters/comparison/comparison-values/default-options';
import { useComparisonProp } from '../../../filters/comparison/comparison-values/use-prop';
import { useComparisonValues } from '../../../filters/comparison/comparison-values/use-values';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { ComparableQueryParams, QueryParams } from '../../../filters/filter-query-params';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
} from '../../../filters/hooks/use-query-filter';
import { TilbakekrevingEnum } from '../../../filters/types';
import { tilbakekrevingFilter } from '../../filters/tilbakekreving';
import { useLabels } from './use-labels';

const useStatistics = () => {
  const [fromDate, toDate] = useFromAndToDates();

  return useStatisticsTotal({ fromDate, toDate });
};

export const useComparisonV2IsLoading = (): boolean => useStatistics().isLoading;

const useAllStatistics = (): IFullStatisticVurderingV2[] => {
  const { data } = useStatistics();

  return data?.rest ?? [];
};

export const useFilteredStatisticsV2 = (): IComparedFullStatisticVurderingV2[] => {
  const data = useAllStatistics();

  const klageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const vedtaksinstansgrupper = useQueryFilters(QueryParams.VEDTAKSINSTANSGRUPPER);
  const enheter = useQueryFilters(QueryParams.ENHETER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  const comparisonProp = useComparisonProp();
  const comparisonValues = useComparisonValues();
  const labels = useLabels();
  const getLabel = useCallback(
    (value: string) => (comparisonProp === null ? value : labels[comparisonProp](value)),
    [comparisonProp, labels]
  );

  const prefilteredData = useMemo(
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

  return useMemo(() => {
    if (comparisonProp === null) {
      return EMPTY_ARRAY;
    }

    interface Bucket extends IComparedFullStatisticVurderingV2 {
      value: string;
    }

    const initialBuckets: Bucket[] = comparisonValues.map(([value, color]) => ({
      value,
      vurderinger: value === AVERAGE ? prefilteredData : [],
      color,
      label: getLabel(value),
    }));

    return prefilteredData.reduce<Bucket[]>((acc, sak) => {
      const value = getMatchedValue(comparisonProp, comparisonValues, sak)?.[0] ?? REST;

      return acc.map((b) => {
        if (b.value !== value) {
          return b;
        }

        return { ...b, vurderinger: [...b.vurderinger, sak] };
      });
    }, initialBuckets);
  }, [comparisonValues, prefilteredData, getLabel, comparisonProp]);
};

const getMatchedValue = (
  comparisonProp: ComparableQueryParams,
  comparisonValues: OptionValue[],
  sak: IFullStatisticVurderingV2
): OptionValue | undefined => {
  switch (comparisonProp) {
    case ComparableQueryParams.KLAGEENHETER:
      return comparisonValues.find(([v]) => v === sak.tilknyttetEnhet);
    case ComparableQueryParams.ENHETER:
      return comparisonValues.find(([v]) => v === sak.vedtaksinstansEnhet);
    case ComparableQueryParams.UTFALL:
      return comparisonValues.find(([v]) => v === sak.utfallId);
    case ComparableQueryParams.YTELSER:
      return comparisonValues.find(([v]) => v === sak.ytelseId);
    case ComparableQueryParams.HJEMLER:
      return comparisonValues.find(([v]) => sak.hjemmelIdList.includes(v));
    case ComparableQueryParams.VEDTAKSINSTANSGRUPPER:
      return comparisonValues.find(([v]) => sak.vedtaksinstansEnhet !== null && sak.vedtaksinstansEnhet.startsWith(v));
    case ComparableQueryParams.DATE_INTERVALS:
      return comparisonValues.find(([v]) => isInDateInterval(sak.avsluttetAvSaksbehandler.iso, v));
  }
};

const isInDateInterval = (date: string, interval: string): boolean => {
  const [from = FORMATTED_START_OF_MONTH, to = FORMATTED_NOW] = interval.split(';');

  return date >= from && date <= to;
};

const DEFAULT_DATE_INTERVAL: [string, string] = [FORMATTED_START_OF_MONTH, FORMATTED_NOW];

const useFromAndToDates = (): [string, string] => {
  const comparisonProp = useComparisonProp();
  const comparisonValues = useComparisonValues();
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  // For all other comparison props, use the dates from the query params.
  if (comparisonProp !== ComparableQueryParams.DATE_INTERVALS) {
    return [fromDate, toDate];
  }

  const [first, ...rest] = comparisonValues;

  const firstInterval = first?.[0].split(';');
  const initalInterval: [string, string] =
    typeof firstInterval !== 'undefined' && isTuple(firstInterval) ? firstInterval : DEFAULT_DATE_INTERVAL;

  const [minDate, maxDate] = rest.reduce<[string, string]>(([min, max], [value]) => {
    const [from, to] = value.split(';');

    return [typeof from === 'string' && from < min ? from : min, typeof to === 'string' && to > max ? to : max];
  }, initalInterval);

  return [minDate, maxDate];
};

const isTuple = <T>(value: T[]): value is [T, T] => value.length === 2;

const EMPTY_ARRAY: [] = [];
