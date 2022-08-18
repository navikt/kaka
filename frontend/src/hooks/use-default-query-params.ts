import { useMemo } from 'react';
import {
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
  MONTH_FORMAT,
  NOW,
} from '../components/filters/date-presets/constants';
import { QueryParams } from '../components/filters/filter-query-params';
import { useUser } from '../simple-api-state/use-user';
import { useKodeverkValue } from './use-kodeverk-value';

export const useDefaultQuery = () =>
  useMemo(() => {
    const fromDate = FORMATTED_START_OF_MONTH;
    const toDate = FORMATTED_NOW;

    return `${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}`;
  }, []);

export const useDefaultQueryTotal = () => {
  const { data } = useUser();
  const vedtaksinstansenheter = useKodeverkValue('vedtaksenheter') ?? [];
  const klageenheter = useKodeverkValue('klageenheter') ?? [];

  const fromDate = FORMATTED_START_OF_MONTH;
  const toDate = FORMATTED_NOW;

  const ansattEnhetId: string | undefined = data?.ansattEnhet?.id;

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
    const fromMonth = NOW.subtract(1, 'month').format(MONTH_FORMAT);
    const toMonth = NOW.subtract(1, 'month').format(MONTH_FORMAT);

    return `${QueryParams.FROM_MONTH}=${fromMonth}&${QueryParams.TO_MONTH}=${toMonth}`;
  }, []);
