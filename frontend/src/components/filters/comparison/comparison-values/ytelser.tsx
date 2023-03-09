import React from 'react';
import { useYtelser } from '../../../../simple-api-state/use-kodeverk';
import { ComparisonOption } from './comparison-option';

export const Ytelser = () => {
  const { data = [] } = useYtelser();

  return <ComparisonOption testId="ytelser-comparison" data={data} />;
};
