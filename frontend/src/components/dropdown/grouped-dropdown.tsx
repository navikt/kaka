import { DropdownContent } from '@app/components/dropdown/styled-components';
import type { CommonGroupedDropdownProps } from '@app/components/dropdown/types';
import { useUpdateFilters } from '@app/components/filters/hooks/use-update-filters';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { DropdownContainer } from './dropdown-container';
import { GroupedHeader } from './header/grouped';

interface DropdownProps extends CommonGroupedDropdownProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export const GroupedDropdown = ({ open, ...rest }: DropdownProps) => {
  if (!open) {
    return null;
  }

  return <ShowGroupedDropdown {...rest} />;
};

const ShowGroupedDropdown = ({
  selected,
  options,
  onChange,
  close,
  maxHeight,
  width,
  testId,
}: Omit<DropdownProps, 'open'>) => {
  const [filteredGroups, setFilteredGroups] = useState(options);
  const updateFilters = useUpdateFilters<string>(selected, onChange);

  const allIds = useMemo(
    () => options.flatMap(({ sectionOptions }) => sectionOptions.map(({ value }) => value)),
    [options],
  );
  const selectAll = () => onChange(allIds);
  const reset = () => onChange([]);

  return (
    <DropdownContainer maxHeight={maxHeight} width={width} testId={testId}>
      <GroupedHeader
        options={options}
        onChange={setFilteredGroups}
        onReset={reset}
        onSelectAll={selectAll}
        close={close}
      />
      <StyledDropdownContent $maxHeight={maxHeight}>
        {filteredGroups.map(({ sectionHeader, sectionOptions }) => (
          <CheckboxGroup
            key={sectionHeader.id}
            legend={sectionHeader.name}
            value={selected}
            data-testid={`${testId}-${sectionHeader.id}`}
          >
            {sectionOptions.map(({ value, label }) => (
              <Checkbox
                key={`${sectionHeader.id}-${value}`}
                size="small"
                value={value}
                onChange={(event) => updateFilters(value, event.target.checked)}
                data-testid={`${testId}-${value}`}
              >
                {label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        ))}
      </StyledDropdownContent>
    </DropdownContainer>
  );
};

const StyledDropdownContent = styled(DropdownContent)<{ $maxHeight?: string }>`
  overflow-y: scroll;
  max-height: ${({ $maxHeight }) => $maxHeight};
`;
