import { Button } from '@navikt/ds-react';
import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { IOption } from './types';

interface Props {
  selectedFromDate: string;
  selectedToDate: string;
  options: IOption[];
  queryFormat: string;
  prettyFormat: string;
  setPreset: (fromDate: dayjs.Dayjs, toDate: dayjs.Dayjs) => void;
}

export const DatePresets = ({
  selectedFromDate,
  selectedToDate,
  options,
  queryFormat,
  prettyFormat,
  setPreset,
}: Props) => (
  <StyledPresetsList>
    {options.map(({ label, fromDate, toDate }) => {
      const title = `${fromDate.format(prettyFormat)} - ${toDate.format(prettyFormat)}`;

      const queryFromDate = fromDate.format(queryFormat);
      const queryToDate = toDate.format(queryFormat);

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
