import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { IKodeverkValue } from '../../types/kodeverk';
import { MultiSelectDropdown } from '../dropdown/multi-select-dropdown';
import { ToggleButton } from '../toggle-button/toggle-button';

interface FilterDropdownProps {
  options: IKodeverkValue[];
  selected: string[];
  onChange: (selected: string[]) => void;
  children: string;
}

export const FilterDropdown = ({ options, selected, onChange, children }: FilterDropdownProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(() => setOpen(false), ref, true);

  const close = () => {
    buttonRef.current?.focus();
    setOpen(false);
  };

  return (
    <Container ref={ref}>
      <ToggleButton theme={{ open }} onClick={() => setOpen(!open)} ref={buttonRef}>
        {children} ({selected.length})
      </ToggleButton>
      <MultiSelectDropdown selected={selected} options={options} open={open} onChange={onChange} close={close} />
    </Container>
  );
};

const Container = styled.section`
  position: relative;
`;
