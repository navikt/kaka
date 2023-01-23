import React from 'react';
import { useYtelser } from '../../../../simple-api-state/use-kodeverk';
import { ComparisonOption } from './comparison-option';

export const Ytelser = () => {
  const { data = [] } = useYtelser();

  return <ComparisonOption data={data.map((y) => ({ id: y.id, label: y.navn }))} />;
};
