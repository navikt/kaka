import { useMemo } from 'react';
import { FORMAT, MONTH_FORMAT, NOW, START_OF_MONTH } from '../components/filters/date-presets/constants';
import { QueryParams } from '../components/filters/filter-query-params';
import { useGetUserDataQuery } from '../redux-api/metadata';
import { useKodeverkValue } from './use-kodeverk-value';

export const useDefaultQuery = () =>
  useMemo(() => {
    const fromDate = NOW.subtract(30, 'day').format(FORMAT);
    const toDate = NOW.format(FORMAT);

    return `${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}`;
  }, []);

export const useDefaultQueryTotal = () => {
  const { data } = useGetUserDataQuery();
  const vedtaksinstansenheter = useKodeverkValue('vedtaksenheter') ?? [];
  const klageenheter = useKodeverkValue('klageenheter') ?? [];

  const fromDate = START_OF_MONTH.format(FORMAT);
  const toDate = NOW.format(FORMAT);

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
