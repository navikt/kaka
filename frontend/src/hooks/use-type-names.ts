import { useMemo } from 'react';
import { useKodeverkValue } from './use-kodeverk-value';

export const useTypeName = (typeId: string): string => {
  const sakstyper = useKodeverkValue('sakstyper');
  return sakstyper?.find(({ id }) => id === typeId)?.navn ?? 'Mangler navn';
};

export const useTypeNames = (typeIdList: string[]): string[] => {
  const sakstyper = useKodeverkValue('sakstyper');

  return useMemo(
    () => typeIdList.map((typeId) => sakstyper?.find(({ id }) => id === typeId)?.navn ?? 'Mangler navn'),
    [sakstyper, typeIdList]
  );
};
