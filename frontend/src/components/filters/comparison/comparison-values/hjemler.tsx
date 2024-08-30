import { GroupedSingleSelect } from '@app/components/dropdown/grouped-single-select';
import type { OptionGroup } from '@app/components/dropdown/types';
import { AddOptionButton } from '@app/components/filters/comparison/comparison-values/add-option-button';
import { DEFAULT_OPTIONS } from '@app/components/filters/comparison/comparison-values/default-options';
import {
  DropdownContainer,
  Ellipsis,
  StyledColorPicker,
  StyledComparisonItem,
} from '@app/components/filters/comparison/comparison-values/styled-components';
import { useOnchange } from '@app/components/filters/comparison/comparison-values/use-onchange';
import { ToggleButton } from '@app/components/toggle/toggle-button';
import { useOnClickOutside } from '@app/hooks/use-on-click-outside';
import { useLovkildeToRegistreringshjemler, useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type { IKodeverkSimpleValue } from '@app/types/kodeverk';
import type { OptionValue } from '@app/types/statistics/common';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useMemo, useRef, useState } from 'react';

const useNextOption = (data: IKodeverkSimpleValue[]): string | undefined => {
  const { selectedValues } = useOnchange();
  const options = useMemo(() => [...data, ...DEFAULT_OPTIONS], [data]);
  const availableOptions = useMemo(
    () => options.filter((e) => !selectedValues.some(([id]) => id === e.id)),
    [options, selectedValues],
  );
  const availableOptionIds = availableOptions.map((e) => e.id);
  const [nextOption] = availableOptionIds;

  return nextOption;
};

export const Hjemler = () => {
  const { selectedValues, add } = useOnchange();
  const { data: registreringshjemlerMap = {} } = useRegistreringshjemlerMap();

  const ids = useMemo(
    () =>
      Object.entries(registreringshjemlerMap).map(([id, { hjemmelnavn }]) => ({
        id,
        navn: hjemmelnavn,
      })),
    [registreringshjemlerMap],
  );

  const nextOption = useNextOption(ids);

  return (
    <>
      <AddOptionButton option={nextOption} onAdd={add} />

      {selectedValues.map(([id, color]) => (
        <HjemmelSelect key={id} value={id} color={color} />
      ))}
    </>
  );
};

const useLovkildeToRegistreringshjemlerOptions = (selectedValues: OptionValue[]) => {
  const { data = [] } = useLovkildeToRegistreringshjemler();

  const selectedIds = useMemo(() => selectedValues.map(([v]) => v), [selectedValues]);

  const hjemmelOptions = useMemo<OptionGroup[]>(
    () =>
      data.map(({ id, navn, registreringshjemler }) => ({
        sectionHeader: { id, name: navn },
        sectionOptions: registreringshjemler
          .filter((h) => !selectedIds.includes(h.id))
          .map((h) => ({ value: h.id, label: h.navn })),
      })),
    [data, selectedIds],
  );

  const defaultOptions = useMemo(
    () =>
      DEFAULT_OPTIONS.filter(({ id }) => !selectedIds.includes(id)).map(({ id, navn }) => ({ value: id, label: navn })),
    [selectedIds],
  );

  if (defaultOptions.length === 0) {
    return hjemmelOptions;
  }

  return [...hjemmelOptions, { sectionHeader: { id: 'default', name: 'Statistikk' }, sectionOptions: defaultOptions }];
};

const HjemmelSelect = ({ value, color }: { value: string; color: string }) => {
  const { selectedValues, remove, setId, setColor } = useOnchange();
  const options = useLovkildeToRegistreringshjemlerOptions(selectedValues);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(() => setIsOpen(false), containerRef);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const { data: hjemler = {} } = useRegistreringshjemlerMap();

  const label = hjemler[value]?.hjemmelnavn ?? DEFAULT_OPTIONS.find(({ id }) => id === value)?.navn ?? value;

  return (
    <StyledComparisonItem>
      <DropdownContainer ref={containerRef}>
        <ToggleButton onClick={toggleOpen} $open={isOpen} $size="small">
          <Ellipsis>{label}</Ellipsis>
        </ToggleButton>
        <GroupedSingleSelect
          selected={value}
          onChange={(selected) => setId(value, selected)}
          options={options}
          testId="hjemmel-comparison"
          open={isOpen}
          close={closeDropdown}
        />
      </DropdownContainer>
      <StyledColorPicker type="color" value={color} onChange={({ target }) => setColor(value, target.value)} />
      <Button onClick={() => remove(value)} size="small" icon={<TrashIcon aria-hidden />} variant="danger" />
    </StyledComparisonItem>
  );
};
