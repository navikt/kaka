import { Delete } from '@navikt/ds-icons';
import { Button, Select } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { NONE_SELECTED, NoneSelected } from '../../../none-selected';

interface Option {
  label: string;
  value: string;
}

interface ComparisonItemProps {
  value: string;
  currentOption: Option;
  availableOptions: Option[];
  onChangeId: (oldId: string, newId: string) => void;
  onChangeColor: (id: string, color: string) => void;
  onRemove: (id: string) => void;
  color: string;
}

export const SimpleComparisonItem = ({
  color,
  value,
  currentOption,
  onChangeColor,
  onChangeId,
  onRemove,
  availableOptions,
}: ComparisonItemProps) => (
  <StyledComparisonItem>
    <StyledSelect
      label=""
      hideLabel
      onChange={({ target }) => onChangeId(value, target.value)}
      size="small"
      value={value ?? NONE_SELECTED}
    >
      <NoneSelected value={value} />
      {[currentOption, ...availableOptions].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
    <StyledColorPicker type="color" value={color} onChange={({ target }) => onChangeColor(value, target.value)} />
    <Button onClick={() => onRemove(value)} size="small" icon={<Delete aria-hidden />} variant="danger" />
  </StyledComparisonItem>
);

const StyledComparisonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledSelect = styled(Select)`
  flex-grow: 1;
`;

const StyledColorPicker = styled.input`
  width: 30px;
  min-width: 30px;
`;
