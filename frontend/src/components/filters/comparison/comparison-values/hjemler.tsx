import React from 'react';
import { useHjemler } from '@app/simple-api-state/use-kodeverk';
import { ComparisonOption } from './comparison-option';

export const Hjemler = () => {
  const { data = [] } = useHjemler();

  return <ComparisonOption testId="hjemler-comparison" data={data} />;
};
