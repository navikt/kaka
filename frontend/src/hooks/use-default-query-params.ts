import { format, subMonths } from 'date-fns';
import { useMemo } from 'react';
import {
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
  MONTH_FORMAT,
  NOW,
} from '../components/filters/date-presets/constants';
import { QueryParams } from '../components/filters/filter-query-params';
import { useKodeverkValueDefault } from '../hooks/use-kodeverk-value';
import { useUser } from '../simple-api-state/use-user';

export const useDefaultQuery = () =>
  useMemo(() => {
    const fromDate = FORMATTED_START_OF_MONTH;
    const toDate = FORMATTED_NOW;

    return `${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}`;
  }, []);

export const useDefaultQueryTotal = () => {
  const { data: user } = useUser();

  const vedtaksinstansenheter = useKodeverkValueDefault('vedtaksenheter');
  const klageenheter = useKodeverkValueDefault('klageenheter');

  const fromDate = FORMATTED_START_OF_MONTH;
  const toDate = FORMATTED_NOW;

  const ansattEnhetId: string | undefined = user?.ansattEnhet?.id;

  const query = `${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}`;

  if (typeof ansattEnhetId === 'undefined') {
    return query;
  }

  if (klageenheter.some(({ id }) => id === ansattEnhetId)) {
    return `${query}&${QueryParams.KLAGEENHETER}=${ansattEnhetId}`;
  }

  if (vedtaksinstansenheter.some(({ id }) => id === ansattEnhetId)) {
    return `${query}&${QueryParams.ENHETER}=${ansattEnhetId}`;
  }

  return query;
};

export const useDefaultQueryLeder = () =>
  useMemo(() => {
    const prevMonth = format(subMonths(NOW, 1), MONTH_FORMAT);

    return `${QueryParams.FROM_MONTH}=${prevMonth}&${QueryParams.TO_MONTH}=${prevMonth}`;
  }, []);
