import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { IKodeverkValue } from '../../types/kodeverk';
import { Header } from './header';
import { SingleSelectOption } from './single-select-option';
import { StyledDropdown, StyledListItem, StyledSectionList } from './styled-components';

interface DropdownProps {
  selected: string | null;
  kodeverk: IKodeverkValue[];
  open: boolean;
  valueKey?: keyof IKodeverkValue;
  onChange: (selected: string) => void;
  close: () => void;
  labelFn: (kodeverkValue: IKodeverkValue) => string;
}

interface Option {
  value: string;
  label: string;
}

export const SingleSelectDropdown = ({
  selected,
  kodeverk,
  open,
  valueKey = 'id',
  onChange,
  close,
  labelFn,
}: DropdownProps): JSX.Element | null => {
  const [filter, setFilter] = useState('');
  const [fuzzyFilter, setFuzzyFilter] = useState<RegExp | null>(null);
  const [simpleFilter, setSimpleFilter] = useState<RegExp | null>(null);
  const [focused, setFocused] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(close, dropdownRef);

  const options = useMemo(
    () => kodeverk.map((kodeverkValue) => ({ value: kodeverkValue[valueKey], label: labelFn(kodeverkValue) })),
    [kodeverk, labelFn, valueKey]
  );

  const filteredOptions = useMemo(
    () => filterOptions(options, fuzzyFilter, simpleFilter),
    [fuzzyFilter, options, simpleFilter]
  );

  useEffect(() => {
    if (!open && focused !== -1) {
      setFocused(-1);
    }
  }, [open, focused]);

  if (!open) {
    return null;
  }

  const onSelectFocused = () => onChange(filteredOptions[focused].value);

  return (
    <StyledDropdown top={0} ref={dropdownRef}>
      <Header
        filter={filter}
        onFocusChange={setFocused}
        onFilterChange={(newFilter, fuzzy, simple) => {
          setFilter(newFilter);
          setFuzzyFilter(fuzzy);
          setSimpleFilter(simple);
        }}
        onSelect={onSelectFocused}
        focused={focused}
        optionsCount={options.length}
        close={close}
      />
      <StyledSectionList>
        {filteredOptions.map(({ label, value }, i) => (
          <StyledListItem key={value}>
            <SingleSelectOption
              active={selected === value}
              filterId={value}
              onSelect={onChange}
              focused={i === focused}
            >
              {label}
            </SingleSelectOption>
          </StyledListItem>
        ))}
      </StyledSectionList>
    </StyledDropdown>
  );
};

const filterOptions = (options: Option[], fuzzyFilter: RegExp | null, simpleFilter: RegExp | null): Option[] => {
  if (fuzzyFilter === null || simpleFilter === null) {
    return options;
  }

  const simpleMatch = options.filter(({ label }) => simpleFilter.test(label));
  const fuzzyMatch = options.filter((o) => !simpleMatch.includes(o)).filter(({ label }) => fuzzyFilter.test(label));

  return [...simpleMatch, ...fuzzyMatch];
};
