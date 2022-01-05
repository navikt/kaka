import { useKodeverkValue } from './use-kodeverk-value';
import { useVikafossenFilter } from './use-vikafossen-filter';

export const useKlageEnheter = () => {
  const enheter = useKodeverkValue('klageenheter');
  return useVikafossenFilter(enheter);
};
