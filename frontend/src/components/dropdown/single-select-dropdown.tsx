import React, { useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { IKodeverkSimpleValue } from '../../types/kodeverk';
import { Header } from './header';
import { SingleSelectOption } from './single-select-option';
import { StyledDropdown, StyledListItem, StyledSectionList } from './styled-components';

interface DropdownProps {
  selected: string | null;
  kodeverk: IKodeverkSimpleValue[];
  open: boolean;
  valueKey?: keyof IKodeverkSimpleValue;
  onChange: (selected: string) => void;
  close: () => void;
  labelFn: (kodeverkValue: IKodeverkSimpleValue) => string;
}

interface Option {
  value: string;
  label: string;
}

export const SingleSelectDropdown = ({ open, ...rest }: DropdownProps) => {
  if (!open) {
    return null;
  }

  return <ShowSingleSelectDropdown {...rest} />;
};

const ShowSingleSelectDropdown = ({
  selected,
  kodeverk,
  valueKey = 'id',
  onChange,
  close,
  labelFn,
}: Omit<DropdownProps, 'open'>): JSX.Element | null => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => kodeverk.map<Option>((kodeverkValue) => ({ value: kodeverkValue[valueKey], label: labelFn(kodeverkValue) })),
    [kodeverk, labelFn, valueKey]
  );

  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  useOnClickOutside(close, dropdownRef);

  return (
    <StyledDropdown ref={dropdownRef}>
      <Header options={options} onChange={setFilteredOptions} close={close} />
      <StyledSectionList>
        {filteredOptions.map(({ label, value }) => (
          <StyledListItem key={value}>
            <SingleSelectOption active={selected === value} filterId={value} onSelect={onChange}>
              {label}
            </SingleSelectOption>
          </StyledListItem>
        ))}
      </StyledSectionList>
    </StyledDropdown>
  );
};
