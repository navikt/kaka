import { Search } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { GroupedDropdown, OptionGroup } from '../../../dropdown/grouped-dropdown';
import { ErrorMessage } from '../../../error-message/error-message';

interface LovhjemmelSelectProps {
  options: OptionGroup[];
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
  error?: string;
  'data-testid'?: string;
  showFjernAlle?: boolean;
  show: boolean;
  id: string;
}

export const LovhjemmelSelect = ({
  onChange,
  options,
  selected,
  disabled,
  error,
  'data-testid': testId,
  showFjernAlle,
  show,
  id,
}: LovhjemmelSelectProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (!show) {
    return null;
  }

  const setSelected = (selectedId: string | null, active: boolean) => {
    if (selectedId === null) {
      onChange([]);

      return;
    }

    const newList = active
      ? [...selected, selectedId]
      : selected.filter((selectedValue: string) => selectedValue !== selectedId);

    onChange(newList);
  };

  const toggleOpen = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <Container data-testid={testId} data-selected={selected.join(',')}>
      <StyledButton
        ref={buttonRef}
        id={id}
        size="medium"
        onClick={toggleOpen}
        disabled={disabled}
        icon={<Search aria-hidden />}
      >
        Hjemmel
      </StyledButton>

      <GroupedDropdown
        anchorEl={buttonRef.current}
        selected={selected}
        options={options}
        open={open}
        onChange={setSelected}
        close={close}
        showFjernAlle={showFjernAlle}
        maxHeight="400px"
        width="100%"
        testId="lovhjemmel-dropdown"
      />
      <ErrorMessage error={error} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
