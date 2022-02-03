import dayjs from 'dayjs';
import { Select } from 'nav-frontend-skjema';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const MONTH_REGEX = new RegExp('^\\d{4}-\\d{2}$');

const NOW = dayjs();
const FIRST_YEAR = 2021;

const MONTHS = [
  { label: 'Januar', value: '01' },
  { label: 'Februar', value: '02' },
  { label: 'Mars', value: '03' },
  { label: 'April', value: '04' },
  { label: 'Mai', value: '05' },
  { label: 'Juni', value: '06' },
  { label: 'Juli', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'Oktober', value: '10' },
  { label: 'November', value: '11' },
  { label: 'Desember', value: '12' },
];

const getCurrentMonth = (): string => {
  const currentMonth = NOW.month() + 1;

  if (currentMonth < 10) {
    return `0${currentMonth}`;
  }

  return `${currentMonth}`;
};

const CURRENT_YEAR = NOW.year();
const CURRENT_MONTH = getCurrentMonth();

const MAX_YEAR = CURRENT_MONTH === '01' ? CURRENT_YEAR - 1 : CURRENT_YEAR;
const MAX_MONTH = MAX_YEAR !== CURRENT_YEAR ? '12' : CURRENT_MONTH;

const generateYears = (fromYear: number, toYear: number) =>
  Array.from({ length: toYear - fromYear + 1 }, (_, index) => toYear - index);

const YEARS = generateYears(FIRST_YEAR, MAX_YEAR);

interface Props {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}

export const MonthFilter = ({ label, value, onChange }: Props) => {
  const [selectedYear, selectedMonth] = useMemo(() => {
    if (value !== null && value.length !== 0 && MONTH_REGEX.test(value)) {
      return value.split('-');
    }

    return [MAX_YEAR.toString(), MAX_MONTH];
  }, [value]);

  const handleYearChange = (year: string) => onChange(`${year}-${selectedMonth}`);

  const handleMonthChange = (month: string) => onChange(`${selectedYear}-${month}`);

  return (
    <Container>
      <Years label={label} value={selectedYear} onChange={handleYearChange} />
      <Months label={label} value={selectedMonth} selectedYear={selectedYear} onChange={handleMonthChange} />
    </Container>
  );
};

interface YearProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Years = ({ label, value, onChange }: YearProps) => (
  <YearLabel>
    <LabelText>{label} år:</LabelText>
    <Select value={value} onChange={({ target }) => onChange(target.value)} disabled={YEARS.length === 1}>
      {YEARS.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  </YearLabel>
);

interface MonthProps {
  label: string;
  value: string;
  selectedYear: string;
  onChange: (value: string) => void;
}

const Months = ({ label, value, selectedYear, onChange }: MonthProps) => {
  const months = useMonths(Number.parseInt(selectedYear, 10));

  return (
    <MonthLabel>
      <LabelText>{label} måned:</LabelText>
      <Select value={value} onChange={({ target }) => onChange(target.value)} disabled={months.length === 1}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </Select>
    </MonthLabel>
  );
};

const useMonths = (year: number) => {
  if (year !== CURRENT_YEAR) {
    return MONTHS;
  }

  return MONTHS.filter((month) => month.value < CURRENT_MONTH);
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const BaseLabel = styled.label`
  display: block;
  cursor: pointer;
  margin-bottom: 16px;
`;

const MonthLabel = styled(BaseLabel)`
  width: 60%;
`;

const YearLabel = styled(BaseLabel)`
  width: 40%;
`;

const LabelText = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
`;
