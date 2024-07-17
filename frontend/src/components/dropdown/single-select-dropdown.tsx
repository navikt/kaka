import { useMemo, useState } from 'react';
import { IKodeverkSimpleValue } from '@app/types/kodeverk';
import { DropdownContainer } from './dropdown-container';
import { SingleHeader } from './header/single';
import { SingleSelectOption } from './single-select-option';
import { StyledListItem, StyledSectionList } from './styled-components';

interface DropdownProps {
  selected: string | null;
  kodeverk: IKodeverkSimpleValue[];
  open: boolean;
  valueKey?: keyof IKodeverkSimpleValue;
  onChange: (selected: string) => void;
  close: () => void;
  labelFn: (kodeverkValue: IKodeverkSimpleValue) => string;
  testId: string;
  maxHeight?: string | number;
  width?: string | number;
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
  testId,
  maxHeight,
  width,
}: Omit<DropdownProps, 'open'>): JSX.Element | null => {
  const options = useMemo(
    () => kodeverk.map<Option>((kodeverkValue) => ({ value: kodeverkValue[valueKey], label: labelFn(kodeverkValue) })),
    [kodeverk, labelFn, valueKey],
  );

  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  return (
    <DropdownContainer maxHeight={maxHeight} width={width}>
      <SingleHeader options={options} onChange={setFilteredOptions} close={close} />
      <StyledSectionList data-testid={`${testId}-list`}>
        {filteredOptions.map(({ label, value }) => (
          <StyledListItem key={value}>
            <SingleSelectOption
              active={selected === value}
              filterId={value}
              onSelect={onChange}
              testId={`${testId}-${value}`}
            >
              {label}
            </SingleSelectOption>
          </StyledListItem>
        ))}
      </StyledSectionList>
    </DropdownContainer>
  );
};
