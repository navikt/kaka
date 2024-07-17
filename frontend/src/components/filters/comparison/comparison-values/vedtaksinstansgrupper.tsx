import { VEDTAKSINSTANSGRUPPE_FILTERS } from '../../../statistikk/total/vedtaksinstansgruppe-filter';
import { ComparisonOption } from './comparison-option';

export const Vedtaksinstansgrupper = () => (
  <ComparisonOption
    testId="vedtaksinstansgrupper-comparison"
    data={VEDTAKSINSTANSGRUPPE_FILTERS.map(({ id, label }) => ({ id: id.toString(10), navn: label }))}
  />
);
