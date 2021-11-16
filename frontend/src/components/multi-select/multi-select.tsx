import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { ErrorMessage } from '../error-message/error-message';
import { Dropdown, Option } from '../filter-dropdown/dropdown';
import { ToggleButton } from '../toggle-button/toggle-button';
import { StyledMultiSelect, StyledTitle } from './styled-components';

interface MultiSelectProps {
  title: React.ReactNode;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
  error?: string;
  'data-testid'?: string;
}

export const MultiSelect = ({
  title,
  onChange,
  options,
  selected,
  disabled,
  error,
  'data-testid': testId,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(() => setOpen(false), ref, true);

  const setSelected = (id: string | null, active: boolean) => {
    if (id === null) {
      onChange([]);
      return;
    }

    const newList = active ? [...selected, id] : selected.filter((selectedValue: string) => selectedValue !== id);

    onChange(newList);
  };

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <StyledMultiSelect ref={ref} data-testid={testId} data-selected={selected.join(',')}>
        <ToggleButton
          error={typeof error !== 'undefined'}
          onClick={toggleOpen}
          disabled={disabled}
          theme={{ open, minHeight: '40px' }}
        >
          <StyledTitle>{title}</StyledTitle>
        </ToggleButton>

        <Dropdown selected={selected} options={options} open={open} onChange={setSelected} />
      </StyledMultiSelect>
      <ErrorMessage error={error} />
    </>
  );
};
