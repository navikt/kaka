import React from 'react';
import { useEnheter } from '../../../../simple-api-state/use-kodeverk';
import { ComparisonOption } from './comparison-option';

export const Enheter = () => {
  const { data = [] } = useEnheter();

  return <ComparisonOption data={data.map((e) => ({ id: e.id, label: e.navn }))} />;
};
