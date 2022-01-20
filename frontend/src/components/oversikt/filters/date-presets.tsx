import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { QueryParams } from '../types';

interface IOption {
  label: string;
  fromDate: string;
  toDate: string;
}

const NOW = dayjs();
const ONE_YEAR_AGO = NOW.subtract(12, 'month');
const LAST_YEAR_START = ONE_YEAR_AGO.startOf('year');
const LAST_YEAR_END = ONE_YEAR_AGO.endOf('year');
const FORMAT = 'YYYY-MM-DD';

const OPTIONS: IOption[] = [
  { label: 'Siste 30 dager', fromDate: NOW.subtract(30, 'day').format(FORMAT), toDate: NOW.format(FORMAT) },
  { label: 'Siste 3 mnd', fromDate: NOW.subtract(3, 'month').format(FORMAT), toDate: NOW.format(FORMAT) },
  { label: 'Siste 12 mnd', fromDate: ONE_YEAR_AGO.format(FORMAT), toDate: NOW.format(FORMAT) },
  { label: 'I år', fromDate: NOW.startOf('year').format(FORMAT), toDate: NOW.format(FORMAT) },
  { label: 'I fjor', fromDate: LAST_YEAR_START.format(FORMAT), toDate: LAST_YEAR_END.format(FORMAT) },
];

interface Props {
  selectedFromDate: string;
  selectedToDate: string;
  setFilter: (filter: QueryParams, value: string) => void;
}

export const DatePresets = ({ selectedFromDate, selectedToDate, setFilter }: Props) => (
  <StyledPresetsList>
    {OPTIONS.map(({ label, fromDate, toDate }) => {
      const isSelected = fromDate === selectedFromDate && toDate === selectedToDate;

      const Button = isSelected ? SelectedPresetButton : PresetButton;

      return (
        <StyledLi key={label}>
          <Button
            onClick={() => {
              setFilter(QueryParams.FROM_DATE, fromDate);
              setFilter(QueryParams.TO_DATE, toDate);
            }}
          >
            {label}
          </Button>
        </StyledLi>
      );
    })}
  </StyledPresetsList>
);

const StyledPresetsList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 16px;
`;

const StyledLi = styled.li`
  width: calc(50% - 4px);
`;

const PresetButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  border: 2px solid #0067c5;
  font-weight: 600;
  background-color: #fff;
  color: #0067c5;
  border-radius: 16px;
  cursor: pointer;

  :hover {
    background-color: #0067c5;
    color: #fff;
  }
`;

const SelectedPresetButton = styled(PresetButton)`
  background-color: #0067c5;
  color: #fff;
`;
