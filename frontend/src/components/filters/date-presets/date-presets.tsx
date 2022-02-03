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

      const Button = isSelected ? SelectedPresetButton : PresetButton;
      const onClick = () => setPreset(fromDate, toDate);

      return (
        <StyledLi key={label}>
          <Button title={title} onClick={onClick}>
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
