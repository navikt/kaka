import { Delete } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { IKodeverkSimpleValue } from '../../../../types/kodeverk';
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
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <StyledComparisonItem>
      <DropdownContainer>
        <ToggleButton ref={ref} onClick={toggleOpen} $open={isOpen} $size="small">
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
          buttonRef={ref.current}
          maxHeight="300px"
          width="100%"
        />
      </DropdownContainer>
      <StyledColorPicker type="color" value={color} onChange={({ target }) => onChangeColor(value, target.value)} />
      <Button onClick={() => onRemove(value)} size="small" icon={<Delete aria-hidden />} variant="danger" />
    </StyledComparisonItem>
  );
};

const StyledComparisonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledColorPicker = styled.input`
  width: 30px;
  min-width: 30px;
`;

const Ellipsis = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DropdownContainer = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
`;
