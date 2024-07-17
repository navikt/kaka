import { Select } from '@navikt/ds-react';
import { useMemo } from 'react';
import { styled } from 'styled-components';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { useVersionQueryFilter } from './hooks/use-query-filter';

const MONTH_REGEX = new RegExp('^\\d{4}-\\d{2}$');

const NOW = new Date();

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
  const currentMonth = NOW.getMonth() + 1;

  if (currentMonth < 10) {
    return `0${currentMonth}`;
  }

  return `${currentMonth}`;
};

const CURRENT_YEAR = NOW.getFullYear();
const CURRENT_MONTH = getCurrentMonth();

const MAX_YEAR = CURRENT_MONTH === '01' ? CURRENT_YEAR - 1 : CURRENT_YEAR;
const MAX_MONTH = MAX_YEAR !== CURRENT_YEAR ? '12' : CURRENT_MONTH;

const generateYears = (fromYear: number, toYear: number) =>
  Array.from({ length: toYear - fromYear + 1 }, (_, index) => toYear - index);

const isYearAndMonth = (value: string[]): value is [string, string] => value.length === 2;

interface Props {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}

export const MonthFilter = ({ label, value, onChange }: Props) => {
  const [selectedYear, selectedMonth] = useMemo<[string, string]>(() => {
    if (value !== null && value.length !== 0 && MONTH_REGEX.test(value)) {
      const yearAndMonth = value.split('-');

      if (isYearAndMonth(yearAndMonth)) {
        return yearAndMonth;
      }
    }

    return [MAX_YEAR.toString(10), MAX_MONTH];
  }, [value]);

  const months = useMonths(Number.parseInt(selectedYear, 10));
  const years = useYears();

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) =>
    onChange(`${target.value}-${selectedMonth}`);

  const handleMonthChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) =>
    onChange(`${selectedYear}-${target.value}`);

  return (
    <Container>
      <Select label={`${label} år`} value={selectedYear} onChange={handleYearChange} size="small">
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Select label={`${label} måned`} value={selectedMonth} onChange={handleMonthChange} size="small">
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};

const useMonths = (year: number) => {
  if (year !== CURRENT_YEAR) {
    return MONTHS;
  }

  return MONTHS.filter((month) => month.value < CURRENT_MONTH);
};

const useYears = () => {
  const version = useVersionQueryFilter();

  return useMemo(() => {
    if (version === KvalitetsvurderingVersion.V1) {
      return [2022];
    } else if (version === KvalitetsvurderingVersion.V2) {
      return generateYears(2023, MAX_YEAR);
    }

    return [];
  }, [version]);
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  grid-gap: 8px;
`;
