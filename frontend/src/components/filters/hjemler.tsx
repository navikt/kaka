import React, { useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { IYtelse } from '../../types/kodeverk';
import { GroupedDropdown, OptionGroup } from '../dropdown/grouped-dropdown';
import { formatMetadata } from './common/dropdown';
import { Container, StyledLabel } from './common/styled-components';
import { useMergedLovKildeToRegistreringshjemler } from './hooks/use-merged-lovkilde-to-registreringshjemler';

interface Props {
  selected: string[];
  setSelected: (hjemmelIds: string[]) => void;
  ytelser: IYtelse[];
}

export const HjemmelFilter = ({ selected, setSelected, ytelser }: Props) => {
  const lovKildeToRegistreringshjemler = useMergedLovKildeToRegistreringshjemler(ytelser);

  const options = useMemo(
    () =>
      lovKildeToRegistreringshjemler.map(({ lovkilde, registreringshjemler }) => ({
        sectionHeader: {
          id: lovkilde.id,
          name: lovkilde.navn,
        },
        sectionOptions: registreringshjemler.map(({ id, label }) => ({
          value: id,
          label,
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
