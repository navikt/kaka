import dayjs from 'dayjs';
import Knapp from 'nav-frontend-knapper';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { ExcelExport } from '../excel-export/excel-export';
import { DateFilter } from './filters/date';
import { DatePresets } from './filters/date-presets';
import { EnheterFilter } from './filters/enheter';
import { HjemmelFilter } from './filters/hjemler';
import { ResetDateButton } from './filters/reset-date';
import { SakstypeFilter } from './filters/sakstyper';
import { UtfallFilter } from './filters/utfall';
import { YtelseFilter } from './filters/ytelser';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from './hooks/use-query-filter';
import { FilteredHjemlerPills } from './pills/hjemler';
import { PillContainer, SelectedFilters } from './pills/pills';
import { QueryParams } from './types';

const NOW = dayjs();
const FORMATTED_NOW = NOW.format('YYYY-MM-DD');
const FORMATTED_30_DAYS_AGO = NOW.subtract(30, 'day').format('YYYY-MM-DD');

export const Filters = () => {
  const { data: userData } = useGetUserDataQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEnheter = useQueryFilters(QueryParams.ENHETER);
  const selectedTypes = useQueryFilters(QueryParams.TYPES);
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  // Dates
  const fromDate = useFromDateQueryFilter();
  const toDate = useToDateQueryFilter();

  const setFilter = (filter: QueryParams, ...values: (string | number)[]) => {
    if (values.length === 0) {
      searchParams.delete(filter);
    } else {
      searchParams.set(filter, values.join(','));
    }

    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    const query = userData?.klageenheter.map(({ id }) => id).join(',');

    if (typeof query === 'string') {
      setSearchParams(
        `?${QueryParams.ENHETER}=${query}&${QueryParams.FROM_DATE}=${FORMATTED_30_DAYS_AGO}&${QueryParams.TO_DATE}=${FORMATTED_NOW}`
      );
    } else {
      setSearchParams('');
    }
  };

  return (
    <Container>
      <StyledResetButton onClick={resetFilters} mini kompakt>
        Nullstill filter
      </StyledResetButton>

      <DateContainer>
        <DateFilter
          label="Fra og med"
          date={fromDate}
          maxDate={toDate}
          onChange={(value) => setFilter(QueryParams.FROM_DATE, value)}
        />
        <ResetDateButton
          date={FORMATTED_30_DAYS_AGO}
          selectedDate={fromDate}
          onClick={(date) => setFilter(QueryParams.FROM_DATE, date)}
          title="30 dager siden"
        />
      </DateContainer>

      <DateContainer>
        <DateFilter
          label="Til og med"
          date={toDate}
          minDate={fromDate}
          onChange={(value) => setFilter(QueryParams.TO_DATE, value)}
        />
        <ResetDateButton
          date={FORMATTED_NOW}
          selectedDate={toDate}
          onClick={(date) => setFilter(QueryParams.TO_DATE, date)}
          title="Nå"
        />
      </DateContainer>

      <DatePresets selectedFromDate={fromDate} selectedToDate={toDate} setFilter={setFilter} />

      <EnheterFilter selected={selectedEnheter} setSelected={(values) => setFilter(QueryParams.ENHETER, ...values)} />
      <UtfallFilter selected={selectedUtfall} setSelected={(values) => setFilter(QueryParams.UTFALL, ...values)} />
      <SakstypeFilter selected={selectedTypes} setSelected={(values) => setFilter(QueryParams.TYPES, ...values)} />
      <YtelseFilter selected={selectedYtelser} setSelected={(values) => setFilter(QueryParams.YTELSER, ...values)} />
      <HjemmelFilter selected={selectedHjemler} setSelected={(values) => setFilter(QueryParams.HJEMLER, ...values)} />

      <PillContainer>
        <SelectedFilters
          values={selectedEnheter}
          queryKey={QueryParams.ENHETER}
          kodeverkKey="enheter"
          setFilter={setFilter}
        />
        <SelectedFilters
          values={selectedUtfall}
          queryKey={QueryParams.UTFALL}
          kodeverkKey="utfall"
          setFilter={setFilter}
        />
        <SelectedFilters
          values={selectedTypes}
          queryKey={QueryParams.TYPES}
          kodeverkKey="sakstyper"
          setFilter={setFilter}
        />
        <SelectedFilters
          values={selectedYtelser}
          queryKey={QueryParams.YTELSER}
          kodeverkKey="ytelser"
          setFilter={setFilter}
        />
        <FilteredHjemlerPills setFilter={setFilter} />
      </PillContainer>
      <ExcelExport />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 80px;
  width: 100%;
`;

const StyledResetButton = styled(Knapp)`
  margin-bottom: 1em;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: end;
  gap: 8px;
  margin-bottom: 16px;
`;
