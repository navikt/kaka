import type { OptionGroup } from '@app/components/dropdown/types';
import { QueryParams } from '@app/components/filters/filter-query-params';
import { useQueryFilters, useVersionQueryFilter } from '@app/components/filters/hooks/use-query-filter';
import { sortWithOrdinals } from '@app/functions/sort-with-ordinals';
import { useOnClickOutside } from '@app/hooks/use-on-click-outside';
import { useYtelser } from '@app/simple-api-state/use-kodeverk';
import { useMemo, useRef, useState } from 'react';
import { GroupedDropdown } from '../dropdown/grouped-dropdown';
import { StyledDropdownButton } from './common/styled-components';

interface Props {
  selected: string[];
  setSelected: (hjemmelIds: string[]) => void;
}

export const HjemmelFilter = ({ selected, setSelected }: Props) => {
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const version = useVersionQueryFilter();

  const { data: ytelser = [] } = useYtelser(version);

  const options = useMemo<OptionGroup[]>(() => {
    const lovkilder = ytelser
      .filter(({ id }) => selectedYtelser.length === 0 || selectedYtelser.includes(id))
      .reduce<Record<string, OptionGroup>>((acc, { lovKildeToRegistreringshjemler }) => {
        for (const { lovkilde, registreringshjemler } of lovKildeToRegistreringshjemler) {
          const { id, navn } = lovkilde;
          const entry = acc[id];
          const sectionOptions = registreringshjemler.map(({ id, navn }) => ({ value: id, label: navn }));

          if (entry === undefined) {
            acc[id] = { sectionHeader: { id, name: navn }, sectionOptions };
          } else {
            for (const option of sectionOptions) {
              if (!entry.sectionOptions.some((o) => o.value === option.value)) {
                entry.sectionOptions.push(option);
              }
            }
          }
        }

        return acc;
      }, {});

    return Object.values(lovkilder).map(({ sectionHeader, sectionOptions }) => ({
      sectionHeader,
      sectionOptions: sectionOptions.toSorted((a, b) => sortWithOrdinals(a.label, b.label)),
    }));
  }, [ytelser, selectedYtelser]);

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
    <div ref={containerRef} style={{ position: 'relative' }}>
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

export const formatMetadata = (metadata?: number | string) =>
  typeof metadata !== 'undefined' ? ` (${metadata})` : null;
