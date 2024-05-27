import { Heading } from '@navikt/ds-react';
import React, { Fragment, useState } from 'react';
import { styled } from 'styled-components';
import { SingleSelectOption } from '@app/components/dropdown/single-select-option';
import { DropdownContent, StyledListItem } from '@app/components/dropdown/styled-components';
import { CommonGroupedDropdownProps } from '@app/components/dropdown/types';
import { DropdownContainer } from './dropdown-container';
import { GroupedHeader } from './header/grouped';

interface Props extends CommonGroupedDropdownProps {
  selected: string;
  onChange: (id: string) => void;
}

export const GroupedSingleSelect = ({ open, ...rest }: Props) => {
  if (!open) {
    return null;
  }

  return <ShowGroupedSingleSelectDropdown {...rest} />;
};

const ShowGroupedSingleSelectDropdown = ({
  selected,
  options,
  onChange,
  close,
  maxHeight,
  width,
  testId,
}: Omit<Props, 'open'>): JSX.Element | null => {
  const [filteredGroups, setFilteredGroups] = useState(options);

  return (
    <DropdownContainer maxHeight={maxHeight} width={width} testId={testId}>
      <GroupedHeader options={options} onChange={setFilteredGroups} close={close} />
      <DropdownContent>
        {filteredGroups.map(({ sectionHeader, sectionOptions }) => (
          <Fragment key={sectionHeader.id}>
            <Heading level="1" size="xsmall">
              {sectionHeader.name}
            </Heading>
            <StyledUl data-testid={`${testId}-${sectionHeader.id}`}>
              {sectionOptions.map(({ value, label }) => (
                <StyledListItem key={value}>
                  <SingleSelectOption
                    active={selected === value}
                    filterId={value}
                    onSelect={onChange}
                    testId={`${testId}-${value}`}
                  >
                    {label}
                  </SingleSelectOption>
                </StyledListItem>
              ))}
            </StyledUl>
          </Fragment>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
