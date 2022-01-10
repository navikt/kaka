import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useAllStatistics } from '../../../hooks/use-statistics';
import { FilterType } from '../types';

interface SakstypeFilterProps {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

export const SakstypeFilter = ({ selectedTypes, setSelectedTypes }: SakstypeFilterProps) => {
  const sakstypes = useFilterTypes();

  const updateTyper = (type: string, checked: boolean) => {
    const newList = checked
      ? [...selectedTypes, type]
      : selectedTypes.filter((selectedValue) => selectedValue !== type);
    setSelectedTypes(newList);
  };

  return (
    <CheckboxGruppe legend="Type">
      {sakstypes.map((sakstype) => (
        <Checkbox
          key={sakstype.id}
          label={`${sakstype.navn} (${sakstype.count})`}
          value={sakstype.id}
          onChange={({ target }) => {
            updateTyper(target.value, target.checked);
          }}
          checked={selectedTypes.includes(sakstype.id)}
        />
      ))}
    </CheckboxGruppe>
  );
};

const useFilterTypes = (): FilterType[] => {
  const stats = useAllStatistics();
  const sakstyper = useKodeverkValueDefault('sakstyper');

  return useMemo<FilterType[]>(
    () =>
      stats.reduce<FilterType[]>((acc, { sakstypeId }) => {
        const sakstype = acc.find(({ id }) => id === sakstypeId);

        if (typeof sakstype === 'undefined') {
          const navn: string = sakstyper.find(({ id }) => id === sakstypeId)?.navn ?? 'Mangler navn';
          return [...acc, { id: sakstypeId, navn, count: 1 }];
        }

        return [...acc.filter(({ id }) => id !== sakstypeId), { ...sakstype, count: sakstype.count + 1 }];
      }, []),
    [stats, sakstyper]
  );
};
