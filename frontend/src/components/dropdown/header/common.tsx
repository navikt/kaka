import { Button, Search } from '@navikt/ds-react';
import type { KeyboardEventHandler } from 'react';
import { styled } from 'styled-components';

export interface BaseProps {
  close: () => void;
  onReset?: () => void;
  onSelectAll?: () => void;
}

interface InternalHeaderProps extends BaseProps {
  onChange: (search: string) => void;
}

export const InternalHeader = ({ onChange, close, onReset, onSelectAll }: InternalHeaderProps) => {
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

  const VelgAlle = () =>
    typeof onSelectAll === 'function' ? (
      <Button variant="secondary" onClick={onSelectAll} size="small">
        Velg alle
      </Button>
    ) : null;

  return (
    <StyledHeader>
      <Search
        variant="simple"
        size="small"
        label="Søk"
        onChange={onChange}
        defaultValue=""
        placeholder="Søk"
        onKeyDown={onKeyDown}
        autoFocus
      />
      <VelgAlle />
      <FjernAlle />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: auto min-content min-content;
  white-space: nowrap;
  padding: 8px;
  top: 0;
  border-bottom: 1px solid #c6c2bf;
  background-color: white;
  z-index: 1;
  gap: 8px;
`;

const removeRegExpTokens = (pattern: string): string => pattern.replace(/[/\\^$*+?.()|[\]{}\s]/g, '');
const escapeRegExp = (pattern: string): string => pattern.replaceAll('-', '\\-');

export const getFilters = (search: string): [null, null] | [RegExp, RegExp] => {
  if (search.length === 0) {
    return [null, null];
  }

  const cleanFilter = removeRegExpTokens(search);
  const pattern = cleanFilter.split('').join('.*');
  const escapedPattern = escapeRegExp(pattern);

  const fuzzy = new RegExp(`.*${escapedPattern}.*`, 'i');
  const simple = new RegExp(`.*${cleanFilter}.*`, 'i');

  return [fuzzy, simple];
};
