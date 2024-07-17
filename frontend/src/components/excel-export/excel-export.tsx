import { DownloadIcon } from '@navikt/aksel-icons';
import { Button, Heading, Select, ToggleGroup } from '@navikt/ds-react';
import { getYear, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { CURRENT_YEAR } from '@app/components/filters/date-presets/constants';
import { useHasRole } from '@app/hooks/use-has-role';
import { Role } from '@app/types/user';
import { QueryParams } from '../filters/filter-query-params';
import { useQueryFilter } from '../filters/hooks/use-query-filter';

const STATS_START_YEAR = 2022;

const YEARS = new Array(CURRENT_YEAR - STATS_START_YEAR + 1).fill(0).map((_, i) => (STATS_START_YEAR + i).toString());

export const ExcelExport = () => {
  const isLeder = useHasRole(Role.ROLE_KLAGE_LEDER);
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const url = useUrl(year);
  const fromDate = useQueryFilter(QueryParams.FROM_DATE);
  const toDate = useQueryFilter(QueryParams.TO_DATE);

  useEffect(() => {
    if (fromDate !== null && toDate !== null) {
      const fromYear = getYear(parseISO(fromDate));
      const toYear = getYear(parseISO(toDate));

      if (fromYear === toYear) {
        return setYear(fromYear);
      }

      return;
    }

    if (fromDate === null && toDate === null) {
      return setYear(CURRENT_YEAR);
    }

    if (fromDate !== null) {
      return setYear(getYear(parseISO(fromDate)));
    }

    if (toDate !== null) {
      return setYear(getYear(parseISO(toDate)));
    }
  }, [fromDate, toDate]);

  if (!isLeder) {
    return null;
  }

  return (
    <>
      <Heading level="1" size="xsmall">
        Eksport
      </Heading>

      <YearPicker year={year} setYear={setYear} />

      <Button
        as="a"
        variant="secondary"
        size="small"
        href={url}
        download="rapport"
        icon={<DownloadIcon aria-hidden />}
        iconPosition="right"
      >
        Eksporter
      </Button>
    </>
  );
};

interface YearProps {
  year: number;
  setYear: (year: number) => void;
}

const YearPicker = (props: YearProps) => (YEARS.length <= 7 ? <ToggleYear {...props} /> : <YearSelector {...props} />);

const YearSelector = ({ year, setYear }: YearProps) => (
  <Select value={year} onChange={({ target }) => setYear(Number.parseInt(target.value, 10))} label="År" size="small">
    {YEARS.map((y) => (
      <option key={y} value={y}>
        {y}
      </option>
    ))}
  </Select>
);

const ToggleYear = ({ year, setYear }: YearProps) => (
  <ToggleGroup value={year.toString()} onChange={(y) => setYear(Number.parseInt(y, 10))} size="small" label="År">
    {YEARS.map((y) => (
      <ToggleGroup.Item key={y} value={y}>
        {y}
      </ToggleGroup.Item>
    ))}
  </ToggleGroup>
);

const useUrl = (year: number) => {
  if (year === 2022) {
    return '/api/kaka-api/export/v1/excel?year=2022';
  }

  return `/api/kaka-api/export/v2/excel?year=${year.toString()}`;
};
