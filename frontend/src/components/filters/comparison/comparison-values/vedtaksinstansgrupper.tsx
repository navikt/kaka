import React from 'react';
import { VEDTAKSINSTANSGRUPPER } from '../../../statistikk/total/vedtaksinstansgruppe-filter';
import { ComparisonOption } from './comparison-option';

export const Vedtaksinstansgrupper = () => (
  <ComparisonOption
    testId="vedtaksinstansgrupper-comparison"
    data={VEDTAKSINSTANSGRUPPER.map(({ id, label }) => ({ id, navn: label }))}
  />
);
