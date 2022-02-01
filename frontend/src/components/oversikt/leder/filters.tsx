import dayjs from 'dayjs';
import Knapp from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { MONTH_FORMAT, NOW, PRETTY_FORMAT } from '../filters/date-presets/constants';
import { DatePresets } from '../filters/date-presets/date-presets';
import { getLastTertial } from '../filters/date-presets/get-last-tertial';
import { IOption } from '../filters/date-presets/types';
import { HjemmelFilter } from '../filters/hjemler';
import { MonthFilter } from '../filters/month';
import { SaksbehandlerFilter } from '../filters/saksbehandler';
import { SakstypeFilter } from '../filters/sakstyper';
import { UtfallFilter } from '../filters/utfall';
import { YtelseFilter } from '../filters/ytelser';
import { useFromMonthQueryFilter, useQueryFilters, useToMonthQueryFilter } from '../hooks/use-query-filter';
import { FilteredHjemlerPills } from '../pills/hjemler';
import { PillContainer, SelectedFilters } from '../pills/pills';
import { FilteredSaksbehandlerPills } from '../pills/saksbehandler';
import { QueryParams } from '../types';
import { useAllManagerStatistics } from './hooks/use-statistics';

const LAST_MONTH = NOW.subtract(1, 'month').format('YYYY-MM');

const datePresets: IOption[] = [
  {
    label: 'Siste måned',
    fromDate: NOW.subtract(1, 'month').startOf('month'),
    toDate: NOW.subtract(1, 'month').endOf('month'),
  },
  { label: 'Siste tertial', ...getLastTertial(NOW) },
];

export const Filters = () => {
  const { data: userData } = useGetUserDataQuery();
  const stats = useAllManagerStatistics();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEnheter = useQueryFilters(QueryParams.ENHETER);
  const selectedTypes = useQueryFilters(QueryParams.TYPES);
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const selectedSaksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);
  // Dates
  const fromMonth = useFromMonthQueryFilter();
  const toMonth = useToMonthQueryFilter();

  const setFilter = (filter: QueryParams, ...values: (string | number)[]) => {
    if (values.length === 0) {
      searchParams.delete(filter);
    } else {
      searchParams.set(filter, values.join(','));
    }

    setSearchParams(searchParams);
  };

  const resetFilters = () =>
    setSearchParams(`?${QueryParams.FROM_MONTH}=${LAST_MONTH}&${QueryParams.TO_MONTH}=${LAST_MONTH}`);

  const setPreset = (fromDate: dayjs.Dayjs, toDate: dayjs.Dayjs) => {
    setFilter(QueryParams.FROM_MONTH, fromDate.format(MONTH_FORMAT));
    setFilter(QueryParams.TO_MONTH, toDate.format(MONTH_FORMAT));
  };

  return (
    <Container>
      <StyledResetButton onClick={resetFilters} mini kompakt>
        Nullstill filter
      </StyledResetButton>

      <MonthFilter label="Fra" value={fromMonth} onChange={(value) => setFilter(QueryParams.FROM_MONTH, value)} />
      <MonthFilter label="Til" value={toMonth} onChange={(value) => setFilter(QueryParams.TO_MONTH, value)} />

      <DatePresets
        selectedFromDate={fromMonth}
        selectedToDate={toMonth}
        options={datePresets}
        setPreset={setPreset}
        queryFormat={MONTH_FORMAT}
        prettyFormat={PRETTY_FORMAT}
      />

      <ReadOnlySelect disabled>
        <option>{userData?.ansattEnhet.beskrivelse}</option>
      </ReadOnlySelect>

      <SaksbehandlerFilter
        selected={selectedSaksbehandlere}
        setSelected={(values) => setFilter(QueryParams.SAKSBEHANDLERE, ...values)}
      />

      <UtfallFilter
        stats={stats}
        selected={selectedUtfall}
        setSelected={(values) => setFilter(QueryParams.UTFALL, ...values)}
      />
      <SakstypeFilter
        stats={stats}
        selected={selectedTypes}
        setSelected={(values) => setFilter(QueryParams.TYPES, ...values)}
      />
      <YtelseFilter
        stats={stats}
        selected={selectedYtelser}
        setSelected={(values) => setFilter(QueryParams.YTELSER, ...values)}
      />
      <HjemmelFilter
        stats={stats}
        selected={selectedHjemler}
        setSelected={(values) => setFilter(QueryParams.HJEMLER, ...values)}
      />

      <PillContainer>
        <SelectedFilters
          values={selectedEnheter}
          queryKey={QueryParams.ENHETER}
          kodeverkKey="enheter"
          category="vedtaksinstans"
          setFilter={setFilter}
        />
        <SelectedFilters
          values={selectedUtfall}
          queryKey={QueryParams.UTFALL}
          kodeverkKey="utfall"
          category="utfall"
          setFilter={setFilter}
        />
        <SelectedFilters
          values={selectedTypes}
          queryKey={QueryParams.TYPES}
          kodeverkKey="sakstyper"
          category="sakstype"
          setFilter={setFilter}
        />
        <SelectedFilters
          values={selectedYtelser}
          queryKey={QueryParams.YTELSER}
          kodeverkKey="ytelser"
          category="ytelse"
          setFilter={setFilter}
        />
        <FilteredHjemlerPills setFilter={setFilter} />
        <FilteredSaksbehandlerPills setFilter={setFilter} />
      </PillContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 80px;
  width: 100%;
  z-index: 1;
`;

const StyledResetButton = styled(Knapp)`
  margin-bottom: 1em;
`;

const ReadOnlySelect = styled(Select)`
  margin-bottom: 16px;
`;
