import {
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
  IS_BEFORE_FEBRUARY_2023,
  MONTH_FORMAT,
  NOW,
} from '@app/components/filters/date-presets/constants';
import { ComparableQueryParams, QueryParams } from '@app/components/filters/filter-query-params';
import { TilbakekrevingEnum } from '@app/components/filters/types';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { useKlageenheter, useVedtaksenheter } from '@app/simple-api-state/use-kodeverk';
import { useUser } from '@app/simple-api-state/use-user';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { format, subMonths } from 'date-fns';
import { useMemo } from 'react';

const DEFAULT_VERSION = `${QueryParams.VERSION}=${KvalitetsvurderingVersion.V3}`;
const version = IS_BEFORE_FEBRUARY_2023 ? KvalitetsvurderingVersion.V1 : KvalitetsvurderingVersion.V3;
const DEFAULT_VERSION_LEDER = `${QueryParams.VERSION}=${version}`;

export const useDefaultQueryAapen = () =>
  useMemo(() => {
    const fromDate = FORMATTED_START_OF_MONTH;
    const toDate = FORMATTED_NOW;

    return `${DEFAULT_VERSION}&${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}`;
  }, []);

export const useDefaultQueryTotal = () => {
  const user = useUser();

  const { data: vedtaksinstansenheter = [] } = useVedtaksenheter();
  const { data: klageenheter = [] } = useKlageenheter();

  const fromDate = FORMATTED_START_OF_MONTH;
  const toDate = FORMATTED_NOW;
  const tilbakekreving = TilbakekrevingEnum.INCLUDE;

  const ansattEnhetId: string | undefined = user?.ansattEnhet?.id;

  const query = `${DEFAULT_VERSION}&${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}&${QueryParams.TILBAKEKREVING}=${tilbakekreving}`;

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

    return `${DEFAULT_VERSION_LEDER}&${QueryParams.FROM_MONTH}=${prevMonth}&${QueryParams.TO_MONTH}=${prevMonth}&${QueryParams.TILBAKEKREVING}=${tilbakekreving}`;
  }, []);

export const useDefaultQueryMin = () => {
  const defaultQuery = useDefaultQueryAapen();
  const tilbakekreving = TilbakekrevingEnum.INCLUDE;

  return `${defaultQuery}&${QueryParams.TILBAKEKREVING}=${tilbakekreving}`;
};

export const useDefaultQueryComparison = () => {
  const defaultQuery = useDefaultQueryAapen();
  const tilbakekreving = TilbakekrevingEnum.INCLUDE;

  const comparisonValues = encodeURIComponent(JSON.stringify([['AVERAGE', ColorToken.Accent500]]));
  const defaultComparison = `comparisonProp=${ComparableQueryParams.ENHETER}&comparisonValues=${comparisonValues}`;

  return `${defaultQuery}&${QueryParams.TILBAKEKREVING}=${tilbakekreving}&${defaultComparison}`;
};

export const useDefaultQueryTilbakemeldinger = useDefaultQueryMin;
