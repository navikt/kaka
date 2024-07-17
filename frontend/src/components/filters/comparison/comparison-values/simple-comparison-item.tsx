import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRef, useState } from 'react';
import {
  DropdownContainer,
  Ellipsis,
  StyledColorPicker,
  StyledComparisonItem,
} from '@app/components/filters/comparison/comparison-values/styled-components';
import { useOnClickOutside } from '@app/hooks/use-on-click-outside';
import { IKodeverkSimpleValue } from '@app/types/kodeverk';
import { SingleSelectDropdown } from '../../../dropdown/single-select-dropdown';
import { ToggleButton } from '../../../toggle/toggle-button';

interface ComparisonItemProps {
  value: string;
  currentOption: IKodeverkSimpleValue;
  availableOptions: IKodeverkSimpleValue[];
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useOnClickOutside(() => setIsOpen(false), containerRef);

  return (
    <StyledComparisonItem>
      <DropdownContainer ref={containerRef}>
        <ToggleButton onClick={toggleOpen} $open={isOpen} $size="small">
          <Ellipsis>{selectedLabel}</Ellipsis>
        </ToggleButton>
        <SingleSelectDropdown
          selected={value}
          kodeverk={[currentOption, ...availableOptions]}
          onChange={(selected) => onChangeId(value, selected)}
          labelFn={({ navn }) => navn}
          testId={testId}
          open={isOpen}
          close={closeDropdown}
          maxHeight="280px"
          width="100%"
        />
      </DropdownContainer>
      <StyledColorPicker type="color" value={color} onChange={({ target }) => onChangeColor(value, target.value)} />
      <Button onClick={() => onRemove(value)} size="small" icon={<TrashIcon aria-hidden />} variant="danger" />
    </StyledComparisonItem>
  );
};
