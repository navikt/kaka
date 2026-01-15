import { ComparisonOption } from '@app/components/filters/comparison/comparison-values/comparison-option';
import { YTELSEGRUPPE_KODEVERK } from '@app/components/statistikk/types';
import { ComparableQueryParams } from '../../filter-query-params';
import { DateIntervals } from './date-intervals';
import { Enheter } from './enheter';
import { Hjemler } from './hjemler';
import { Klageenheter } from './klageenheter';
import { useComparisonProp } from './use-prop';
import { Utfall } from './utfall';
import { Vedtaksinstansgrupper } from './vedtaksinstansgrupper';
import { Ytelser } from './ytelser';

export const ComparisonValues = () => {
  const prop = useComparisonProp();

  if (prop === null) {
    return null;
  }

  switch (prop) {
    case ComparableQueryParams.ENHETER:
      return <Enheter />;
    case ComparableQueryParams.KLAGEENHETER:
      return <Klageenheter />;
    case ComparableQueryParams.HJEMLER:
      return <Hjemler />;
    case ComparableQueryParams.UTFALL:
      return <Utfall />;
    case ComparableQueryParams.VEDTAKSINSTANSGRUPPER:
      return <Vedtaksinstansgrupper />;
    case ComparableQueryParams.YTELSEGRUPPER:
      return <ComparisonOption data={YTELSEGRUPPE_KODEVERK} />;
    case ComparableQueryParams.YTELSER:
      return <Ytelser />;
    case ComparableQueryParams.DATE_INTERVALS:
      return <DateIntervals />;
  }
};
