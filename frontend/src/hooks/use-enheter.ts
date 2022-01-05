import { useKodeverkValue } from './use-kodeverk-value';
import { useVikafossenFilter } from './use-vikafossen-filter';

export const useEnheter = () => {
  const enheter = useKodeverkValue('enheter');
  return useVikafossenFilter(enheter);
};
