import { Button } from '@navikt/ds-react';
import { format } from 'date-fns';
import { styled } from 'styled-components';
import type { IOption } from './types';

interface Props {
  selectedFromDate: string;
  selectedToDate: string;
  options: IOption[];
  queryFormat: string;
  prettyFormat: string;
  setPreset: (fromDate: Date, toDate: Date) => void;
  disabled?: boolean;
}

export const DatePresets = ({
  selectedFromDate,
  selectedToDate,
  options,
  queryFormat,
  prettyFormat,
  setPreset,
  disabled = false,
}: Props) => (
  <StyledPresetsList>
    {options.map(({ label, fromDate, toDate }) => {
      const title = `${format(fromDate, prettyFormat)} - ${format(toDate, prettyFormat)}`;

      const queryFromDate = format(fromDate, queryFormat);
      const queryToDate = format(toDate, queryFormat);

      const isSelected = queryFromDate === selectedFromDate && queryToDate === selectedToDate;

      const onClick = () => setPreset(fromDate, toDate);

      return (
        <StyledLi key={label}>
          <Button
            variant={isSelected ? 'primary' : 'secondary'}
            size="small"
            aria-pressed={isSelected}
            title={title}
            onClick={onClick}
            disabled={disabled}
          >
            {label}
          </Button>
        </StyledLi>
      );
    })}
  </StyledPresetsList>
);

const StyledPresetsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledLi = styled.li`
  display: grid;
  width: 100%;
`;
