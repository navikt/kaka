import { filterHjemler } from '@app/components/statistikk/filters/filter-hjemler';
import { useYtelserQueryFilter } from '@app/components/statistikk/hooks/use-ytelser-query-filter';
import { isYtelsegruppe, YTELSESGRUPPER } from '@app/components/statistikk/types';
import { useStatisticsTotal } from '@app/simple-api-state/statistics/v3/use-statistics-total';
import type { OptionValue } from '@app/types/statistics/common';
import type { IComparedFullStatisticVurderingV3, IFullStatisticVurderingV3 } from '@app/types/statistics/v3';
import { useCallback, useMemo } from 'react';
import { AVERAGE, GLOBAL_AVERAGE, REST } from '../../../filters/comparison/comparison-values/default-options';
import { useComparisonProp } from '../../../filters/comparison/comparison-values/use-prop';
import { useComparisonValues } from '../../../filters/comparison/comparison-values/use-values';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { ComparableQueryParams, QueryParams } from '../../../filters/filter-query-params';
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
import { useLabels } from './use-labels';

const useStatistics = () => {
  const [fromDate, toDate] = useFromAndToDates();

  return useStatisticsTotal({ fromDate, toDate });
};

export const useComparisonV3IsLoading = (): boolean => useStatistics().isLoading;

const useAllStatistics = (): IFullStatisticVurderingV3[] => {
  const { data } = useStatistics();

  return data?.rest ?? [];
};

export const useFilteredStatisticsV3 = (): IComparedFullStatisticVurderingV3[] => {
  const data = useAllStatistics();

  const klageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const vedtaksinstansgrupper = useVedtaksinstansgruppeQueryFilter();
  const enheter = useQueryFilters(QueryParams.ENHETER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const types = useSakstypeFilter();
  const ytelser = useYtelserQueryFilter();
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekrevingQuery = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);
  const hjemlerMode = useHjemlerModeFilter(HjemlerModeFilter.INCLUDE_FOR_SOME);

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
        ({
          ytelseId,
          sakstypeId,
          utfallId,
          tilknyttetEnhet,
          vedtaksinstansEnhet,
          vedtaksinstansgruppe,
          hjemmelIdList,
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
      data,
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

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: ¯\_(ツ)_/¯
  return useMemo(() => {
    if (comparisonProp === null) {
      return EMPTY_ARRAY;
    }

    interface Bucket extends IComparedFullStatisticVurderingV3 {
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
  sak: IFullStatisticVurderingV3,
): OptionValue | undefined => {
  switch (comparisonProp) {
    case ComparableQueryParams.KLAGEENHETER:
      return comparisonValues.find(([v]) => v === sak.tilknyttetEnhet);
    case ComparableQueryParams.ENHETER:
      return comparisonValues.find(([v]) => v === sak.vedtaksinstansEnhet);
    case ComparableQueryParams.UTFALL:
      return comparisonValues.find(([v]) => v === sak.utfallId);
    case ComparableQueryParams.YTELSESGRUPPER:
      return comparisonValues.find(([v]) => (isYtelsegruppe(v) ? YTELSESGRUPPER[v].includes(sak.ytelseId) : []));
    case ComparableQueryParams.YTELSER:
      return comparisonValues.find(([v]) => v === sak.ytelseId);
    case ComparableQueryParams.HJEMLER:
      return comparisonValues.find(([v]) => sak.hjemmelIdList.includes(v));
    case ComparableQueryParams.VEDTAKSINSTANSGRUPPER:
      return comparisonValues.find(([v]) => sak.vedtaksinstansgruppe.toString(10) === v);
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

const isTuple = <T>(value: T[]): value is [T, T] => value.length === 3;

const EMPTY_ARRAY: [] = [];
