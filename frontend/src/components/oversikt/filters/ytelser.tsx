import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useAllStatistics } from '../../../hooks/use-statistics';
import { FilterType } from '../types';

const useFilterYtelser = (): FilterType[] => {
  const stats = useAllStatistics();
  const ytelser = useKodeverkValueDefault('ytelser');

  return useMemo<FilterType[]>(
    () =>
      stats.reduce<FilterType[]>((acc, { ytelseId }) => {
        if (ytelseId === null) {
          const ytelse = acc.find(({ id }) => id === 'none');

          if (typeof ytelse === 'undefined') {
            const newFilter: FilterType = { id: 'none', navn: 'Ingen', count: 1 };
            return [...acc, newFilter];
          }

          return [...acc.filter(({ id }) => id !== ytelseId), { ...ytelse, count: ytelse.count + 1 }];
        }

        const ytelse = acc.find(({ id }) => id === ytelseId);

        if (typeof ytelse === 'undefined') {
          const navn: string = ytelser.find(({ id }) => id === ytelseId)?.navn ?? 'Mangler navn';
          const newFilter: FilterType = { id: ytelseId, navn, count: 1 };
          return [...acc, newFilter];
        }

        return [...acc.filter(({ id }) => id !== ytelseId), { ...ytelse, count: ytelse.count + 1 }];
      }, []),
    [stats, ytelser]
  );
};

interface YtelseFilterProps {
  selectedYtelser: string[];
  setSelectedYtelser: (ytelser: string[]) => void;
}

export const YtelseFilter = ({ selectedYtelser, setSelectedYtelser }: YtelseFilterProps) => {
  const ytelser = useFilterYtelser();

  const updateYtelser = (ytelse: string, checked: boolean) => {
    const newList = checked
      ? [...selectedYtelser, ytelse]
      : selectedYtelser.filter((selectedValue) => selectedValue !== ytelse);
    setSelectedYtelser(newList);
  };

  return (
    <CheckboxGruppe legend="Ytelse">
      {ytelser.map((ytelse) => (
        <Checkbox
          key={ytelse.id}
          label={`${ytelse.navn} (${ytelse.count})`}
          value={ytelse.id}
          onChange={({ target }) => {
            updateYtelser(target.value, target.checked);
          }}
          checked={selectedYtelser.includes(ytelse.id)}
        />
      ))}
    </CheckboxGruppe>
  );
};
