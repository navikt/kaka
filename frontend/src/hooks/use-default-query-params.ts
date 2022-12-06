import { format, subMonths } from 'date-fns';
import { useMemo } from 'react';
import {
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
  MONTH_FORMAT,
  NOW,
} from '../components/filters/date-presets/constants';
import { QueryParams } from '../components/filters/filter-query-params';
import { TilbakekrevingEnum } from '../components/filters/types';
import { useKlageenheter, useVedtaksenheter } from '../simple-api-state/use-kodeverk';
import { useUser } from '../simple-api-state/use-user';

export const useDefaultQueryAapen = () =>
  useMemo(() => {
    const fromDate = FORMATTED_START_OF_MONTH;
    const toDate = FORMATTED_NOW;

    return `${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}`;
  }, []);

export const useDefaultQueryTotal = () => {
  const { data: user } = useUser();

  const { data: vedtaksinstansenheter = [] } = useVedtaksenheter();
  const { data: klageenheter = [] } = useKlageenheter();

  const fromDate = FORMATTED_START_OF_MONTH;
  const toDate = FORMATTED_NOW;
  const tilbakekreving = TilbakekrevingEnum.INCLUDE;

  const ansattEnhetId: string | undefined = user?.ansattEnhet?.id;

  const query = `${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}&${QueryParams.TILBAKEKREVING}=${tilbakekreving}`;

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
    const tilbakekreving = TilbakekrevingEnum.INCLUDE;

    return `${QueryParams.FROM_MONTH}=${prevMonth}&${QueryParams.TO_MONTH}=${prevMonth}&${QueryParams.TILBAKEKREVING}=${tilbakekreving}`;
  }, []);

export const useDefaultQueryMin = () => {
  const defaultQuery = useDefaultQueryAapen();
  const tilbakekreving = TilbakekrevingEnum.INCLUDE;

  return `${defaultQuery}&${QueryParams.TILBAKEKREVING}=${tilbakekreving}`;
};

export const useDefaultQueryTilbakemeldinger = useDefaultQueryMin;
