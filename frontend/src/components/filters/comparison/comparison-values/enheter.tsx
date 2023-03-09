import React from 'react';
import { useEnheter } from '../../../../simple-api-state/use-kodeverk';
import { ComparisonOption } from './comparison-option';

export const Enheter = () => {
  const { data = [] } = useEnheter();

  return (
    <ComparisonOption
      testId="enheter-comparison"
      data={data.map(({ id, navn }) => ({ id, navn: `${id} - ${navn}` }))}
    />
  );
};
