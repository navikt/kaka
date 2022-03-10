import { useMemo } from 'react';
import { useKodeverkValue } from './use-kodeverk-value';

export const useEnhetName = (enhetId: string): string => {
  const enheter = useKodeverkValue('enheter');
  return enheter?.find((enhet) => enhet.id === enhetId)?.beskrivelse ?? 'Mangler navn';
};

export const useEnhetNames = (enhetIdList: string[]): string[] => {
  const enheter = useKodeverkValue('enheter');

  return useMemo(
    () => enhetIdList.map((enhetId) => enheter?.find((enhet) => enhet.id === enhetId)?.beskrivelse ?? 'Mangler navn'),
    [enheter, enhetIdList]
  );
};
