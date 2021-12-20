import React, { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { IKodeverkValue } from '../../types/kodeverk';
import { Header } from './header';
import { MultiSelectOption } from './multi-select-option';
import { StyledDropdown, StyledListItem, StyledSectionList } from './styled-components';

interface MultiSelectDropdownProps {
  selected: string[];
  options: IKodeverkValue[];
  open: boolean;
  onChange: (selected: string[]) => void;
  close: () => void;
}

export const MultiSelectDropdown = ({
  selected,
  options,
  open,
  onChange,
  close,
}: MultiSelectDropdownProps): JSX.Element | null => {
  const [filter, setFilter] = useState('');
  const [fuzzyFilter, setFuzzyFilter] = useState<RegExp | null>(null);
  const [focused, setFocused] = useState(-1);
  const [localSelected, setLocalSelected] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(close, dropdownRef);

  const filteredOptions = filterOptions(options, fuzzyFilter);

  useEffect(() => {
    if (!open && focused !== -1) {
      setFocused(-1);
    }
  }, [open, focused]);

  if (!open) {
    return null;
  }

  const reset = () => onChange([]);

  const onSelectFocused = () => {
    const focusedOption = options[focused].id;

    if (selected.includes(focusedOption)) {
      onChange(selected.filter((id) => id !== focusedOption));
    } else {
      onChange([...selected, focusedOption]);
    }
  };

  const onOptionChange = (filterId: string, active: boolean) => {
    if (active) {
      const selectedValues = localSelected.includes(filterId) ? localSelected : [...localSelected.concat(filterId)];

      onChange(selectedValues);
      setLocalSelected(selectedValues);
    } else {
      const selectedValues = [...localSelected.filter((id) => id !== filterId)];

      onChange(selectedValues);
      setLocalSelected(selectedValues);
    }
  };

  return (
    <StyledDropdown ref={dropdownRef}>
      <Header
        filter={filter}
        onFocusChange={setFocused}
        onFilterChange={(newFilter, fuzzy) => {
          setFilter(newFilter);
          setFuzzyFilter(fuzzy);
        }}
        onSelect={onSelectFocused}
        focused={focused}
        onReset={reset}
        optionsCount={options.length}
        close={close}
      />
      <StyledSectionList>
        {filteredOptions.map(({ id, beskrivelse }, i) => (
          <StyledListItem key={id}>
            <MultiSelectOption
              active={selected.includes(id)}
              filterId={id}
              onChange={onOptionChange}
              focused={i === focused}
            >
              {beskrivelse}
            </MultiSelectOption>
          </StyledListItem>
        ))}
      </StyledSectionList>
    </StyledDropdown>
  );
};

const filterOptions = (options: IKodeverkValue[], fuzzyFilter: RegExp | null) => {
  if (fuzzyFilter === null) {
    return options;
  }

  return options.filter(({ beskrivelse }) => fuzzyFilter.test(beskrivelse));
};
