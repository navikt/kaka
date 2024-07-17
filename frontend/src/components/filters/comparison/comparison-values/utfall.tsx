import { useSortedUtfall } from '@app/simple-api-state/use-utfall';
import { ComparisonOption } from './comparison-option';

export const Utfall = () => {
  const { data = [] } = useSortedUtfall();

  return <ComparisonOption testId="utfall-comparison" data={data} />;
};
