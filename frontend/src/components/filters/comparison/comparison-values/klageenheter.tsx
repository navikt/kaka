import React from 'react';
import { useKlageenheter } from '../../../../simple-api-state/use-kodeverk';
import { ComparisonOption } from './comparison-option';

export const Klageenheter = () => {
  const { data = [] } = useKlageenheter();

  return <ComparisonOption testId="klageenheter-comparison" data={data} />;
};
