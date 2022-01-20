import { Datepicker } from 'nav-datovelger';
import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  date: string;
  onChange: (date: string) => void;
  maxDate?: string;
  minDate?: string;
}

export const DateFilter = ({ label, date, maxDate, minDate, onChange }: Props) => (
  <Label>
    <LabelText>{label}:</LabelText>
    <Datepicker
      onChange={onChange}
      value={date}
      showYearSelector
      limitations={{ maxDate, minDate }}
      calendarSettings={{ showWeekNumbers: true }}
    />
  </Label>
);

const Label = styled.label`
  display: block;
  width: fit-content;
  cursor: pointer;
`;

const LabelText = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
`;
