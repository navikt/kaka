import React, { useMemo, useState } from 'react';
import { useLovkildeToRegistreringshjemler } from '../../simple-api-state/use-kodeverk';
import { GroupedDropdown, OptionGroup } from '../dropdown/grouped-dropdown';
import { formatMetadata } from './common/dropdown';
import { StyledDropdownButton } from './common/styled-components';

interface Props {
  selected: string[];
  setSelected: (hjemmelIds: string[]) => void;
}

export const HjemmelFilter = ({ selected, setSelected }: Props) => {
  const { data = [] } = useLovkildeToRegistreringshjemler();

  const options = useMemo<OptionGroup[]>(
    () =>
      data.map(({ id, navn, registreringshjemler }) => ({
        sectionHeader: { id, name: navn },
        sectionOptions: registreringshjemler.map((h) => ({ value: h.id, label: h.navn })),
      })),
    [data]
  );

  return <HjemmelSelect options={options} selected={selected} onChange={setSelected} metadata={selected.length} />;
};

interface HjemmelSelectProps {
  options: OptionGroup[];
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
  metadata?: string | number;
}

const HjemmelSelect = ({ onChange, options, selected, disabled, metadata }: HjemmelSelectProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const setSelected = (id: string | null, active: boolean) => {
    if (id === null) {
      onChange([]);

      return;
    }

    const newList = active ? [...selected, id] : selected.filter((selectedValue: string) => selectedValue !== id);

    onChange(newList);
  };

  const toggleOpen = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <>
      <StyledDropdownButton onClick={toggleOpen} disabled={disabled} open={open} ref={buttonRef}>
        Hjemmel
        {formatMetadata(metadata)}
      </StyledDropdownButton>

      <GroupedDropdown
        anchorEl={buttonRef.current}
        selected={selected}
        options={options}
        open={open}
        onChange={setSelected}
        close={close}
        showFjernAlle
        maxHeight="400px"
        width="100%"
        testId="hjemmel-filter"
      />
    </>
  );
};
