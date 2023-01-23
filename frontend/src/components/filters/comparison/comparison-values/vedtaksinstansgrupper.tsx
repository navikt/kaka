import React from 'react';
import { VEDTAKSINSTANSGRUPPER } from '../../../statistikk/total/vedtaksinstansgruppe-filter';
import { ComparisonOption } from './comparison-option';

export const Vedtaksinstansgrupper = () => (
  <ComparisonOption data={VEDTAKSINSTANSGRUPPER.map((v) => ({ id: v.id, label: v.label }))} />
);
