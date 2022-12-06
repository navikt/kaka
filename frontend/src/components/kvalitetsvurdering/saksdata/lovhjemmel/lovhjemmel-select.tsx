import { Search } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '../../../../hooks/use-on-click-outside';
import { GroupedDropdown, OptionGroup } from '../../../dropdown/grouped-dropdown';
import { ErrorMessage } from '../../../error-message/error-message';
import { StyledHjemler, StyledLovhjemmelSelect } from './styled-components';

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
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(() => setOpen(false), ref, true);

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
    <>
      <StyledLovhjemmelSelect ref={ref} data-testid={testId} data-selected={selected.join(',')}>
        <StyledHjemler>
          <Button id={id} size="medium" onClick={toggleOpen} disabled={disabled} icon={<Search aria-hidden />}>
            Hjemmel
          </Button>
        </StyledHjemler>

        <GroupedDropdown
          selected={selected}
          options={options}
          open={open}
          onChange={setSelected}
          close={close}
          showFjernAlle={showFjernAlle}
          maxHeight="400px"
          testId="lovhjemmel-dropdown"
        />
      </StyledLovhjemmelSelect>
      <ErrorMessage error={error} />
    </>
  );
};
