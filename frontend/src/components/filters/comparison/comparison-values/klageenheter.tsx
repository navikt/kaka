import React from 'react';
import { useKlageenheter } from '../../../../simple-api-state/use-kodeverk';
import { ComparisonOption } from './comparison-option';

export const Klageenheter = () => {
  const { data = [] } = useKlageenheter();

  return <ComparisonOption data={data.map((k) => ({ id: k.id, label: k.navn }))} />;
};
