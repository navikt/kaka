import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useAllStatistics } from '../../../hooks/use-statistics';
import { FilterType } from '../types';

interface EnheterFilterProps {
  selectedEnheter: string[];
  setSelectedEnheter: (enheter: string[]) => void;
}

export const EnheterFilter = ({ selectedEnheter, setSelectedEnheter }: EnheterFilterProps) => {
  const enheter = useFilterEnheter();

  const updateTyper = (enhet: string, checked: boolean) => {
    const newList = checked
      ? [...selectedEnheter, enhet]
      : selectedEnheter.filter((selectedValue) => selectedValue !== enhet);
    setSelectedEnheter(newList);
  };

  return (
    <CheckboxGruppe legend="Enhet">
      {enheter.map((enhet) => (
        <Checkbox
          key={enhet.id}
          label={`${enhet.navn} (${enhet.count})`}
          value={enhet.id}
          onChange={({ target }) => {
            updateTyper(target.value, target.checked);
          }}
          checked={selectedEnheter.includes(enhet.id)}
        />
      ))}
    </CheckboxGruppe>
  );
};

const useFilterEnheter = (): FilterType[] => {
  const stats = useAllStatistics();
  const enheter = useKodeverkValueDefault('enheter');

  return useMemo<FilterType[]>(
    () =>
      stats.reduce<FilterType[]>((acc, { tilknyttetEnhet }) => {
        const enhet = acc.find(({ id }) => id === tilknyttetEnhet);

        if (typeof enhet === 'undefined') {
          const navn: string = enheter.find(({ id }) => id === tilknyttetEnhet)?.beskrivelse ?? 'Mangler navn';
          return [...acc, { id: tilknyttetEnhet, navn, count: 1 }];
        }

        return [...acc.filter(({ id }) => id !== tilknyttetEnhet), { ...enhet, count: enhet.count + 1 }];
      }, []),
    [stats, enheter]
  );
};
