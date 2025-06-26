import {
  StyledColorPicker,
  StyledComparisonItem,
} from '@app/components/filters/comparison/comparison-values/styled-components';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, UNSAFE_Combobox } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface Option {
  value: string;
  label: string;
}

interface ComparisonItemProps {
  value: string;
  currentOption: Option;
  availableOptions: Option[];
  onChangeId: (oldId: string, newId: string) => void;
  onChangeColor: (id: string, color: string) => void;
  onRemove: (id: string) => void;
  color: string;
  selectedLabel: string;
  testId: string;
}

export const SimpleComparisonItem = ({
  color,
  value,
  currentOption,
  onChangeColor,
  onChangeId,
  onRemove,
  availableOptions,
  selectedLabel,
  testId,
}: ComparisonItemProps) => {
  const [localValue, setLocalValue] = useState<string | null>(value);

  useEffect(() => {
    if (localValue !== null && localValue !== value) {
      onChangeId(value, localValue);
    }
  }, [localValue, value, onChangeId]);

  const options = [currentOption, ...availableOptions];
  const selected = localValue === null ? [] : options.filter((option) => option.value === localValue);

  return (
    <StyledComparisonItem>
      <StyledCombobox
        size="small"
        label={selectedLabel}
        shouldAutocomplete
        data-testid={testId}
        hideLabel
        options={options}
        selectedOptions={selected}
        onToggleSelected={setLocalValue}
        onKeyDownCapture={(event) => {
          if (event.key === 'Backspace' && selected.length > 0) {
            setLocalValue(null);
          }
        }}
      />
      <StyledColorPicker type="color" value={color} onChange={({ target }) => onChangeColor(value, target.value)} />
      <Button onClick={() => onRemove(value)} size="small" icon={<TrashIcon aria-hidden />} variant="danger" />
    </StyledComparisonItem>
  );
};

const StyledCombobox = styled(UNSAFE_Combobox)`
  flex-grow: 1;
`;
