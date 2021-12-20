import React, { useEffect, useState } from 'react';
import { Header } from './header';
import { MultiSelectOption } from './multi-select-option';
import {
  StyledDropdown,
  StyledDropdownProps,
  StyledListItem,
  StyledOptionList,
  StyledSectionHeader,
  StyledSectionList,
} from './styled-components';

export interface Option {
  label: string;
  value: string;
}

export interface SectionHeader {
  id: string;
  name?: string;
}

export interface OptionGroup {
  sectionHeader: SectionHeader;
  sectionOptions: Option[];
}

interface DropdownProps extends StyledDropdownProps {
  selected: string[];
  options: OptionGroup[];
  onChange: (id: string | null, active: boolean) => void;
  open: boolean;
  close: () => void;
  showFjernAlle?: boolean;
}

export const GroupedDropdown = ({
  selected,
  options,
  open,
  onChange,
  close,
  top,
  left,
  maxHeight,
  showFjernAlle = true,
}: DropdownProps): JSX.Element | null => {
  const [filter, setFilter] = useState('');
  const [fuzzyFilter, setFuzzyFilter] = useState<RegExp | null>(null);
  const [focused, setFocused] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [flattenedFilteredOptions, setFlattenedFilteredOptions] = useState<Option[]>(
    options.flatMap(({ sectionOptions }) => sectionOptions)
  );

  useEffect(() => {
    if (fuzzyFilter === null) {
      setFilteredOptions(options);
      setFlattenedFilteredOptions(options.flatMap(({ sectionOptions }) => sectionOptions));
      return;
    }

    const filteredGroups = options.filter(({ sectionOptions }) =>
      sectionOptions.some(({ label }) => fuzzyFilter.test(label))
    );

    const filtered = filteredGroups.map(({ sectionOptions, ...rest }) => ({
      ...rest,
      sectionOptions: sectionOptions.filter(({ label }) => fuzzyFilter.test(label)),
    }));

    setFilteredOptions(filtered);
    setFlattenedFilteredOptions(filtered.flatMap(({ sectionOptions }) => sectionOptions));
  }, [setFilteredOptions, options, fuzzyFilter]);

  useEffect(() => {
    if (!open && focused !== -1) {
      setFocused(-1);
    }
  }, [open, focused]);

  if (!open) {
    return null;
  }

  const reset = () => {
    onChange(null, false);
  };

  const onSelectFocused = () => {
    const focusedOption = flattenedFilteredOptions[focused].value;
    onChange(focusedOption, !selected.includes(focusedOption));
  };

  return (
    <StyledDropdown top={top} left={left} maxHeight={maxHeight}>
      <Header
        filter={filter}
        onFocusChange={setFocused}
        onFilterChange={(newFilter, fuzzy) => {
          setFilter(newFilter);
          setFuzzyFilter(fuzzy);
        }}
        onSelect={onSelectFocused}
        focused={focused}
        onReset={showFjernAlle === true ? reset : undefined}
        optionsCount={flattenedFilteredOptions.length}
        close={close}
      />
      <StyledSectionList>
        {filteredOptions.map(({ sectionHeader, sectionOptions }) => (
          <li key={sectionHeader.id}>
            {typeof sectionHeader.name !== 'undefined' && (
              <StyledSectionHeader>{sectionHeader.name}</StyledSectionHeader>
            )}
            <StyledOptionList>
              {sectionOptions.map(({ value, label }) => (
                <StyledListItem key={value}>
                  <MultiSelectOption
                    active={selected.includes(value)}
                    filterId={value}
                    onChange={onChange}
                    focused={focused === flattenedFilteredOptions.findIndex((o) => o.value === value)}
                  >
                    {label}
                  </MultiSelectOption>
                </StyledListItem>
              ))}
            </StyledOptionList>
          </li>
        ))}
      </StyledSectionList>
    </StyledDropdown>
  );
};
