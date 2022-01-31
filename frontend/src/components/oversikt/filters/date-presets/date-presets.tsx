import React from 'react';
import styled from 'styled-components';
import { QueryParams } from '../../types';
import { FORMAT, LAST_YEAR_END, LAST_YEAR_START, NOW, ONE_YEAR_AGO, PRETTY_FORMAT } from './constants';
import { getLastTertial } from './get-last-tertial';
import { IOption } from './types';

const OPTIONS: IOption[] = [
  { label: 'Siste 30 dager', fromDate: NOW.subtract(30, 'day'), toDate: NOW },
  { label: 'Siste tertial', ...getLastTertial(NOW) },
  { label: 'Nest siste tertial', ...getLastTertial(NOW.subtract(4, 'month')) },
  { label: 'Siste 12 mnd', fromDate: ONE_YEAR_AGO, toDate: NOW },
  { label: 'I år', fromDate: NOW.startOf('year'), toDate: NOW },
  { label: 'I fjor', fromDate: LAST_YEAR_START, toDate: LAST_YEAR_END },
];

interface Props {
  selectedFromDate: string;
  selectedToDate: string;
  setFilter: (filter: QueryParams, value: string) => void;
}

export const DatePresets = ({ selectedFromDate, selectedToDate, setFilter }: Props) => (
  <StyledPresetsList>
    {OPTIONS.map(({ label, fromDate, toDate }) => {
      const title = `${fromDate.format(PRETTY_FORMAT)} - ${toDate.format(PRETTY_FORMAT)}`;

      const isoFromDate = fromDate.format(FORMAT);
      const isoToDate = toDate.format(FORMAT);

      const isSelected = isoFromDate === selectedFromDate && isoToDate === selectedToDate;

      const Button = isSelected ? SelectedPresetButton : PresetButton;

      return (
        <StyledLi key={label}>
          <Button
            title={title}
            onClick={() => {
              setFilter(QueryParams.FROM_DATE, isoFromDate);
              setFilter(QueryParams.TO_DATE, isoToDate);
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
