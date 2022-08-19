import { Button, Search } from '@navikt/ds-react';
import React, { KeyboardEventHandler, useCallback } from 'react';
import styled from 'styled-components';

interface Option {
  label: string;
}

interface HeaderProps<T extends Option> {
  options: T[];
  onChange: (filtered: T[]) => void;
  close: () => void;
  onReset?: () => void;
}

export const Header = <T extends Option>({ options, onChange, close, onReset }: HeaderProps<T>): JSX.Element | null => {
  const onInputChange = useCallback(
    (search: string) => {
      const cleanFilter = removeRegExpTokens(search);
      const pattern = cleanFilter.split('').join('.*');
      const escapedPattern = escapeRegExp(pattern);

      const fuzzy = new RegExp(`.*${escapedPattern}.*`, 'i');
      const simple = new RegExp(`.*${cleanFilter}.*`, 'i');
      onChange(filterOptions(options, fuzzy, simple));
    },
    [onChange, options]
  );

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Escape') {
      return close();
    }
  };

  const FjernAlle = () =>
    typeof onReset === 'function' ? (
      <Button variant="secondary" onClick={onReset} size="small">
        Fjern alle
      </Button>
    ) : null;

  return (
    <StyledHeader>
      <Search
        variant="simple"
        size="small"
        label="Søk"
        onChange={onInputChange}
        defaultValue=""
        placeholder="Søk"
        onKeyDown={onKeyDown}
        autoFocus
      />
      <FjernAlle />
    </StyledHeader>
  );
};

const removeRegExpTokens = (pattern: string): string => pattern.replace(/[/\\^$*+?.()|[\]{}\s]/g, '');
const escapeRegExp = (pattern: string): string => pattern.replaceAll('-', '\\-');

const filterOptions = <T extends Option>(
  options: T[],
  fuzzyFilter: RegExp | null,
  simpleFilter: RegExp | null
): T[] => {
  if (fuzzyFilter === null || simpleFilter === null) {
    return options;
  }

  const simpleMatch = options.filter(({ label }) => simpleFilter.test(label));
  const fuzzyMatch = options.filter((o) => !simpleMatch.includes(o)).filter(({ label }) => fuzzyFilter.test(label));

  return [...simpleMatch, ...fuzzyMatch];
};

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  white-space: nowrap;
  padding: 8px;
  top: 0;
  border-bottom: 1px solid #c6c2bf;
  background-color: white;
  z-index: 1;
  gap: 8px;
`;
