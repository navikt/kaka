import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Header } from './header';
import { StyledDropdown, StyledDropdownProps } from './styled-components';

interface Option {
  label: string;
  value: string;
}

interface SectionHeader {
  id: string;
  name?: string;
}

export interface OptionGroup {
  sectionHeader: SectionHeader;
  sectionOptions: Option[];
}

interface DropdownProps extends StyledDropdownProps {
  selected: string[];
  options: OptionGroup[];
  onChange: (id: string | null, active: boolean) => void;
  open: boolean;
  close: () => void;
  showFjernAlle?: boolean;
  testId: string;
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
  minWidth,
  testId,
  showFjernAlle = true,
}: Omit<DropdownProps, 'open'>): JSX.Element | null => {
  const [filteredGroups, setFilteredGroups] = useState(options);

  const allGroups = useMemo(() => options.flatMap(({ sectionOptions }) => sectionOptions), [options]);

  const onHeaderChange = useCallback(
    (filteredOptions: Option[]) =>
      setFilteredGroups(
        options
          .map(({ sectionOptions, ...rest }) => ({
            ...rest,
            sectionOptions: sectionOptions.filter((o) => filteredOptions.includes(o)),
          }))
          .filter(({ sectionOptions }) => sectionOptions.length !== 0)
      ),
    [options]
  );

  const reset = () => onChange(null, false);

  return (
    <StyledDropdown maxHeight={maxHeight} minWidth={minWidth} data-testid={testId}>
      <Header
        options={allGroups}
        onChange={onHeaderChange}
        onReset={showFjernAlle === true ? reset : undefined}
        close={close}
      />
      <Container>
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
      </Container>
    </StyledDropdown>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 8px;
  overflow-y: scroll;
`;
