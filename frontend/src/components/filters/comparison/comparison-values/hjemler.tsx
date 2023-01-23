import React from 'react';
import { useHjemler } from '../../../../simple-api-state/use-kodeverk';
import { ComparisonOption } from './comparison-option';

export const Hjemler = () => {
  const { data = [] } = useHjemler();

  return <ComparisonOption data={data.map((h) => ({ id: h.id, label: h.navn }))} />;
};
