import { useMemo } from 'react';
import { isoDateToPretty } from '@app/domain/date';
import { useEnheter, useHjemler, useKlageenheter, useYtelser } from '@app/simple-api-state/use-kodeverk';
import { useSortedUtfall } from '@app/simple-api-state/use-utfall';
import { IKodeverkSimpleValue } from '@app/types/kodeverk';
import { AVERAGE, REST } from '../../../filters/comparison/comparison-values/default-options';
import { ComparableQueryParams } from '../../../filters/filter-query-params';
import { VEDTAKSINSTANSGRUPPER } from '../../total/vedtaksinstansgruppe-filter';

export const useLabels = (): Record<ComparableQueryParams, (value: string) => string> => {
  const { data: enheter = [] } = useEnheter();
  const { data: klageenheter = [] } = useKlageenheter();
  const { data: ytelser = [] } = useYtelser();
  const { data: hjemler = [] } = useHjemler();
  const { data: utfall = [] } = useSortedUtfall();

  return useMemo(
    () => ({
      [ComparableQueryParams.ENHETER]: (id) => getLabel(id, enheter),
      [ComparableQueryParams.KLAGEENHETER]: (id) => getLabel(id, klageenheter),
      [ComparableQueryParams.YTELSER]: (id) => getLabel(id, ytelser),
      [ComparableQueryParams.HJEMLER]: (id) => getLabel(id, hjemler),
      [ComparableQueryParams.VEDTAKSINSTANSGRUPPER]: (id) =>
        getLabel(
          id,
          VEDTAKSINSTANSGRUPPER.map((g) => ({ id: g.id, navn: g.label }))
        ),
      [ComparableQueryParams.UTFALL]: (id) => getLabel(id, utfall),
      [ComparableQueryParams.DATE_INTERVALS]: (dateInterval) =>
        dateInterval.split(';').map(isoDateToPretty).join(' - '),
    }),
    [enheter, hjemler, klageenheter, utfall, ytelser]
  );
};

const getLabel = (value: string, options: IKodeverkSimpleValue<string>[]): string => {
  if (value === AVERAGE) {
    return 'Gjennomsnitt';
  }

  if (value === REST) {
    return 'Resten';
  }

  return options.find((option) => option.id === value)?.navn ?? value;
};
