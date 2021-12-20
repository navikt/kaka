import React, { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { IKodeverkValue } from '../../types/kodeverk';
import { Header } from './header';
import { SingleSelectOption } from './single-select-option';
import { StyledDropdown, StyledListItem, StyledSectionList } from './styled-components';

interface DropdownProps {
  selected: string | null;
  options: IKodeverkValue[];
  open: boolean;
  onChange: (selected: string) => void;
  close: () => void;
}

export const SingleSelectDropdown = ({
  selected,
  options,
  open,
  onChange,
  close,
}: DropdownProps): JSX.Element | null => {
  const [filter, setFilter] = useState('');
  const [fuzzyFilter, setFuzzyFilter] = useState<RegExp | null>(null);
  const [simpleFilter, setSimpleFilter] = useState<RegExp | null>(null);
  const [focused, setFocused] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(close, dropdownRef);

  const filteredOptions = filterOptions(options, fuzzyFilter, simpleFilter);

  useEffect(() => {
    if (!open && focused !== -1) {
      setFocused(-1);
    }
  }, [open, focused]);

  if (!open) {
    return null;
  }

  const onSelectFocused = () => onChange(filteredOptions[focused].id);

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
        {filteredOptions.map(({ id, beskrivelse }, i) => (
          <StyledListItem key={id}>
            <SingleSelectOption active={selected === id} filterId={id} onSelect={onChange} focused={i === focused}>
              {beskrivelse}
            </SingleSelectOption>
          </StyledListItem>
        ))}
      </StyledSectionList>
    </StyledDropdown>
  );
};

const filterOptions = (
  options: IKodeverkValue[],
  fuzzyFilter: RegExp | null,
  simpleFilter: RegExp | null
): IKodeverkValue[] => {
  if (fuzzyFilter === null || simpleFilter === null) {
    return options;
  }

  const simpleMatch = options.filter(({ beskrivelse }) => simpleFilter.test(beskrivelse));
  const fuzzyMatch = options
    .filter((o) => !simpleMatch.includes(o))
    .filter(({ beskrivelse }) => fuzzyFilter.test(beskrivelse));
  return [...simpleMatch, ...fuzzyMatch];
};
