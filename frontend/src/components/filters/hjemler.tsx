import type { OptionGroup } from '@app/components/dropdown/types';
import { useOnClickOutside } from '@app/hooks/use-on-click-outside';
import { useLovkildeToRegistreringshjemler } from '@app/simple-api-state/use-kodeverk';
import { useMemo, useRef, useState } from 'react';
import { GroupedDropdown } from '../dropdown/grouped-dropdown';
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
    [data],
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
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(() => setOpen(false), containerRef);

  const toggleOpen = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <div ref={containerRef}>
      <StyledDropdownButton onClick={toggleOpen} disabled={disabled} open={open}>
        Hjemmel
        {formatMetadata(metadata)}
      </StyledDropdownButton>

      <GroupedDropdown
        selected={selected}
        options={options}
        open={open}
        onChange={onChange}
        close={close}
        maxHeight="400px"
        width="100%"
        testId="hjemmel-filter"
      />
    </div>
  );
};
