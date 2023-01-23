import React from 'react';
import { useSortedUtfall } from '../../../../simple-api-state/use-utfall';
import { ComparisonOption } from './comparison-option';

export const Utfall = () => {
  const { data = [] } = useSortedUtfall();

  return <ComparisonOption data={data.map((u) => ({ id: u.id, label: u.navn }))} />;
};
