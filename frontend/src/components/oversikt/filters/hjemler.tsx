import React, { useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../../../hooks/use-on-click-outside';
import { GroupedDropdown, OptionGroup } from '../../dropdown/grouped-dropdown';
import { useMergedLovKildeToRegistreringshjemler } from '../hooks/use-merged-lovkilde-to-registreingshjemler';
import { StatisticsProps } from '../types';
import { formatMetadata } from './common/dropdown';
import { Container, StyledLabel } from './common/styled-components';

interface Props extends StatisticsProps {
  selected: string[];
  setSelected: (hjemmelIds: string[]) => void;
}

export const HjemmelFilter = ({ selected, setSelected, stats }: Props) => {
  const lovKildeToRegistreringshjemler = useMergedLovKildeToRegistreringshjemler(stats);

  const options = useMemo(
    () =>
      lovKildeToRegistreringshjemler.map(({ lovkilde, registreringshjemler }) => ({
        sectionHeader: {
          id: lovkilde.id,
          name: lovkilde.navn,
        },
        sectionOptions: registreringshjemler.map(({ id, label, count }) => ({
          value: id,
          label: `${label}${typeof count === 'undefined' ? '' : ` (${count})`}`,
        })),
      })),
    [lovKildeToRegistreringshjemler]
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

export const HjemmelSelect = ({ onChange, options, selected, disabled, metadata }: HjemmelSelectProps) => {
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
  const close = () => setOpen(false);

  return (
    <Container ref={ref}>
      <StyledLabel onClick={toggleOpen} disabled={disabled} open={open}>
        Hjemmel
        {formatMetadata(metadata)}
      </StyledLabel>

      <GroupedDropdown
        selected={selected}
        options={options}
        open={open}
        onChange={setSelected}
        close={close}
        showFjernAlle
        top="40px"
        maxHeight="400px"
        minWidth="100%"
      />
    </Container>
  );
};
