import Knapp from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import React, { Fragment, KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Filter } from './option';

export interface Option {
  label: string;
  value: string;
}

export interface SectionHeader {
  id: string;
  name: string;
}

export interface OptionGroup {
  sectionHeader: SectionHeader;
  sectionOptions: Option[];
}

interface DropdownProps {
  selected: string[];
  options: OptionGroup[];
  onChange: (id: string | null, active: boolean) => void;
  open: boolean;
  close: () => void;
  showFjernAlle?: boolean;
}

export const Dropdown = ({
  selected,
  options,
  open,
  onChange,
  close,
  showFjernAlle = true,
}: DropdownProps): JSX.Element | null => {
  const [rawFilter, setFilter] = useState('');
  const [focused, setFocused] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const topItemRef = useRef<HTMLLIElement>(null);
  const [flattenedFilteredOptions, setFlattenedFilteredOptions] = useState<Option[]>(
    options.map(({ sectionOptions }) => sectionOptions).flat()
  );

  const filter = useMemo<RegExp>(() => {
    const cleanFilter = removeRegExpTokens(rawFilter);
    const pattern = cleanFilter.split('').join('.*');
    const escapedPattern = escapeRegExp(pattern);

    return new RegExp(`.*${escapedPattern}.*`, 'i');
  }, [rawFilter]);

  useEffect(() => {
    const filteredGroups = options.filter(({ sectionOptions }) =>
      sectionOptions.some(({ label }) => filter.test(label))
    );

    const filtered = filteredGroups.map(({ sectionOptions, ...rest }) => ({
      ...rest,
      sectionOptions: sectionOptions.filter(({ label }) => filter.test(label)),
    }));

    setFilteredOptions(filtered);
    setFlattenedFilteredOptions(filtered.map(({ sectionOptions }) => sectionOptions).flat());
  }, [setFilteredOptions, options, filter]);

  useEffect(() => {
    if (!open && focused !== -1) {
      setFocused(-1);
    }
  }, [open, focused]);

  if (!open) {
    return null;
  }

  const reset = () => {
    onChange(null, false);
  };

  const onFilterChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(target.value);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Escape') {
      setFocused(-1);
      return close();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (focused === flattenedFilteredOptions.length - 1) {
        topItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        return setFocused(-1);
      }

      return setFocused(focused + 1);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (focused === -1) {
        return setFocused(flattenedFilteredOptions.length - 1);
      }

      if (focused === 0) {
        topItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
      }

      return setFocused(focused - 1);
    }

    if (event.key === 'Enter' || (event.key === ' ' && focused !== -1)) {
      if (focused < flattenedFilteredOptions.length && focused !== -1) {
        event.preventDefault();
        const { value } = flattenedFilteredOptions[focused];
        return onChange(value, !selected.includes(value));
      }
    }
  };

  return (
    <StyledList>
      <StyledTopListItem ref={topItemRef}>
        <StyledInput
          onChange={onFilterChange}
          value={rawFilter}
          placeholder="Søk"
          onKeyDown={onKeyDown}
          autoFocus
          type="search"
        />
        {showFjernAlle && (
          <StyledKnapp mini kompakt onClick={reset}>
            Fjern alle
          </StyledKnapp>
        )}
      </StyledTopListItem>

      {filteredOptions.map(({ sectionHeader, sectionOptions }) => (
        <Fragment key={sectionHeader.id}>
          {typeof sectionHeader !== 'undefined' && <StyledSectionHeader>{sectionHeader.name}</StyledSectionHeader>}
          {sectionOptions.map(({ value, label }) => (
            <StyledListItem key={value}>
              <Filter
                active={selected.includes(value)}
                filterId={value}
                onChange={onChange}
                focused={focused === flattenedFilteredOptions.findIndex((o) => o.value === value)}
              >
                {label}
              </Filter>
            </StyledListItem>
          ))}
        </Fragment>
      ))}
    </StyledList>
  );
};

const removeRegExpTokens = (pattern: string): string => pattern.replace(/[/\\^$*+?.()|[\]{}\s]/g, '');
const escapeRegExp = (pattern: string): string => pattern.replaceAll('-', '\\-');

const StyledList = styled.ul`
  display: block;
  position: absolute;
  top: 0;
  left: 370px;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid #c6c2bf;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  width: 100%;
  min-width: 275px;
  max-height: 400px;
`;

const StyledListItem = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const StyledTopListItem = styled(StyledListItem)`
  border-bottom: 1px solid #c6c2bf;
  background-color: white;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
`;

const StyledKnapp = styled(Knapp)`
  &&& {
    margin-left: 0.5em;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledSectionHeader = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-left: 1em;
  margin-top: 1em;
  margin-bottom: 0.5em;
`;
