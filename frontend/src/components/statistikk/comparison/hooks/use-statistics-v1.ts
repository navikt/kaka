import { useCallback, useMemo } from 'react';
import { useStatisticsTotal } from '@app/simple-api-state/statistics/v1/use-statistics-total';
import { OptionValue } from '@app/types/statistics/common';
import { IComparedFullStatisticVurderingV1, IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { AVERAGE, GLOBAL_AVERAGE, REST } from '../../../filters/comparison/comparison-values/default-options';
import { useComparisonProp } from '../../../filters/comparison/comparison-values/use-prop';
import { useComparisonValues } from '../../../filters/comparison/comparison-values/use-values';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { ComparableQueryParams, QueryParams } from '../../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../../filters/hooks/use-query-filter';
import { useLabels } from './use-labels';

const useStatistics = () => {
  const [fromDate, toDate] = useFromAndToDates();

  return useStatisticsTotal({ fromDate, toDate });
};

export const useComparisonV1IsLoading = (): boolean => useStatistics().isLoading;

const useAllStatistics = (): IFullStatisticVurderingV1[] => {
  const { data } = useStatistics();

  return data?.rest ?? [];
};

export const useFilteredStatisticsV1 = (): IComparedFullStatisticVurderingV1[] => {
  const data = useAllStatistics();

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);

  const comparisonProp = useComparisonProp();
  const comparisonValues = useComparisonValues();
  const labels = useLabels();
  const getLabel = useCallback(
    (value: string) => (comparisonProp === null ? value : labels[comparisonProp](value)),
    [comparisonProp, labels],
  );

  const prefilteredData = useMemo(
    () =>
      data.filter(
        (s) =>
          s.avsluttetAvSaksbehandler !== null &&
          (utfall.length === 0 || utfall.includes(s.utfallId)) &&
          (types.length === 0 || types.includes(s.sakstypeId)) &&
          (ytelser.length === 0 || ytelser.includes(s.ytelseId)),
      ),
    [data, utfall, types, ytelser],
  );

  return useMemo(() => {
    if (comparisonProp === null) {
      return EMPTY_ARRAY;
    }

    interface Bucket extends IComparedFullStatisticVurderingV1 {
      value: string;
    }

    const initialBuckets: Bucket[] = comparisonValues.map(([value, color]) => ({
      value,
      vurderinger: value === GLOBAL_AVERAGE ? prefilteredData : [],
      color,
      label: getLabel(value),
    }));

    for (const sak of prefilteredData) {
      const value = getMatchedValue(comparisonProp, comparisonValues, sak)?.[0] ?? REST;

      for (const bucket of initialBuckets) {
        if (bucket.value !== value) {
          continue;
        }

        bucket.vurderinger.push(sak);
      }
    }

    for (const averageBucket of initialBuckets) {
      if (averageBucket.value === AVERAGE) {
        for (const bucket of initialBuckets) {
          if (
            bucket.vurderinger.length === 0 ||
            bucket.value === GLOBAL_AVERAGE ||
            bucket.value === REST ||
            bucket.value === AVERAGE
          ) {
            continue;
          }

          averageBucket.vurderinger.push(...bucket.vurderinger);
        }

        break;
      }
    }

    return initialBuckets;
  }, [comparisonValues, prefilteredData, getLabel, comparisonProp]);
};

const getMatchedValue = (
  comparisonProp: ComparableQueryParams,
  comparisonValues: OptionValue[],
  sak: IFullStatisticVurderingV1,
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

const isTuple = <T>(value: T[]): value is [T, T] => value.length === 1;

const EMPTY_ARRAY: [] = [];
