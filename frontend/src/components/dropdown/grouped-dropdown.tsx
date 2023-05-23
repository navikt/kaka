import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React, { useMemo, useState } from 'react';
import { useOnHeaderChange } from '@app/components/dropdown/hooks/use-on-header-change';
import { DropdownContent } from '@app/components/dropdown/styled-components';
import { CommonGroupedDropdownProps } from '@app/components/dropdown/types';
import { DropdownContainer } from './dropdown-container';
import { Header } from './header';

interface DropdownProps extends CommonGroupedDropdownProps {
  selected: string[];
  onChange: (id: string | null, active: boolean) => void;
  showFjernAlle?: boolean;
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
  anchorEl,
  showFjernAlle = true,
}: Omit<DropdownProps, 'open'>): JSX.Element | null => {
  const [filteredGroups, setFilteredGroups] = useState(options);
  const allGroups = useMemo(() => options.flatMap(({ sectionOptions }) => sectionOptions), [options]);
  const onHeaderChange = useOnHeaderChange(options, setFilteredGroups);

  const reset = () => onChange(null, false);

  return (
    <DropdownContainer maxHeight={maxHeight} width={width} buttonRef={anchorEl} onClose={close} testId={testId}>
      <Header
        options={allGroups}
        onChange={onHeaderChange}
        onReset={showFjernAlle === true ? reset : undefined}
        close={close}
      />
      <DropdownContent>
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
                onChange={(event) => onChange(value, event.target.checked)}
                data-testid={`${testId}-${value}`}
              >
                {label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};
