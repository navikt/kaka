import { YTELSEGRUPPE_KODEVERK } from '@app/components/statistikk/types';
import { isoDateToPretty } from '@app/domain/date';
import {
  type RegistreringshjemlerMap,
  useEnheter,
  useKlageenheter,
  useRegistreringshjemlerMap,
  useYtelser,
} from '@app/simple-api-state/use-kodeverk';
import { useSortedUtfall } from '@app/simple-api-state/use-utfall';
import type { IKodeverkSimpleValue } from '@app/types/kodeverk';
import { useMemo } from 'react';
import {
  AVERAGE,
  AVERAGE_LABEL,
  GLOBAL_AVERAGE,
  GLOBAL_AVERAGE_LABEL,
  REST,
  REST_LABEL,
} from '../../../filters/comparison/comparison-values/default-options';
import { ComparableQueryParams } from '../../../filters/filter-query-params';
import { VEDTAKSINSTANSGRUPPE_FILTERS } from '../../total/vedtaksinstansgruppe-filter';

export const useLabels = (): Record<ComparableQueryParams, (value: string) => string> => {
  const { data: enheter = [] } = useEnheter();
  const { data: klageenheter = [] } = useKlageenheter();
  const { data: ytelser = [] } = useYtelser();
  const { data: hjemler = {} } = useRegistreringshjemlerMap();
  const { data: utfall = [] } = useSortedUtfall();

  return useMemo(
    () => ({
      [ComparableQueryParams.ENHETER]: (id) => getLabel(id, enheter),
      [ComparableQueryParams.KLAGEENHETER]: (id) => getLabel(id, klageenheter),
      [ComparableQueryParams.YTELSER]: (id) => getLabel(id, ytelser),
      [ComparableQueryParams.YTELSEGRUPPER]: (id) => getLabel(id, YTELSEGRUPPE_KODEVERK),
      [ComparableQueryParams.HJEMLER]: (id) => getHjemmelLabel(id, hjemler),
      [ComparableQueryParams.VEDTAKSINSTANSGRUPPER]: (id) =>
        getLabel(
          id,
          VEDTAKSINSTANSGRUPPE_FILTERS.map((g) => ({ id: g.id.toString(10), navn: g.label })),
        ),
      [ComparableQueryParams.UTFALL]: (id) => getLabel(id, utfall),
      [ComparableQueryParams.DATE_INTERVALS]: (dateInterval) =>
        dateInterval.split(';').map(isoDateToPretty).join(' - '),
    }),
    [enheter, hjemler, klageenheter, utfall, ytelser],
  );
};

const getDefaultLabel = (value: string) => {
  if (value === GLOBAL_AVERAGE) {
    return GLOBAL_AVERAGE_LABEL;
  }

  if (value === AVERAGE) {
    return AVERAGE_LABEL;
  }

  if (value === REST) {
    return REST_LABEL;
  }

  return null;
};

const getLabel = (value: string, options: IKodeverkSimpleValue<string>[]): string =>
  getDefaultLabel(value) ?? options.find((option) => option.id === value)?.navn ?? value;

const getHjemmelLabel = (value: string, hjemler: RegistreringshjemlerMap): string =>
  getDefaultLabel(value) ?? hjemler[value]?.hjemmelnavn ?? value;
