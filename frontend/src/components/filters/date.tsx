import React from 'react';
import { DatepickerWithValidation } from '../date-picker/date-picker';

interface Props {
  label: string;
  date: string;
  onChange: (date: string) => void;
  maxDate?: string;
  minDate?: string;
}

export const DateFilter = ({ label, date, maxDate, minDate, onChange }: Props) => (
  <DatepickerWithValidation
    label={label}
    inputName="date"
    size="small"
    onChange={onChange}
    value={date}
    showYearSelector
    limitations={{ maxDate, minDate }}
    calendarSettings={{ showWeekNumbers: true }}
  />
);
