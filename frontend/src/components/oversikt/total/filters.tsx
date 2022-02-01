import dayjs from 'dayjs';
import Knapp from 'nav-frontend-knapper';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { ExcelExport } from '../../excel-export/excel-export';
import { DateFilter } from '../filters/date';
import {
  FORMAT,
  LAST_YEAR_END,
  LAST_YEAR_START,
  NOW,
  ONE_YEAR_AGO,
  PRETTY_FORMAT,
} from '../filters/date-presets/constants';
import { DatePresets } from '../filters/date-presets/date-presets';
import { getLastTertial } from '../filters/date-presets/get-last-tertial';
import { IOption } from '../filters/date-presets/types';
import { EnheterFilter } from '../filters/enheter';
import { HjemmelFilter } from '../filters/hjemler';
import { KlageenheterFilter } from '../filters/klageenheter';
import { ResetDateButton } from '../filters/reset-date';
import { SakstypeFilter } from '../filters/sakstyper';
import { UtfallFilter } from '../filters/utfall';
import { YtelseFilter } from '../filters/ytelser';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../hooks/use-query-filter';
import { SelectedEnheterFilters } from '../pills/enhet';
import { FilteredHjemlerPills } from '../pills/hjemler';
import { PillContainer, SelectedFilters } from '../pills/pills';
import { QueryParams } from '../types';
import { useAllTotalStatistics } from './hooks/use-statistics';

const FORMATTED_NOW = NOW.format('YYYY-MM-DD');
const FORMATTED_30_DAYS_AGO = NOW.subtract(30, 'day').format('YYYY-MM-DD');

const datePresets: IOption[] = [
  {
    label: 'Siste 30 dager',
    fromDate: NOW.subtract(30, 'day'),
    toDate: NOW,
  },
  { label: 'Siste tertial', ...getLastTertial(NOW) },
  { label: 'Nest siste tertial', ...getLastTertial(NOW.subtract(4, 'month')) },
  { label: 'Siste 12 mnd', fromDate: ONE_YEAR_AGO, toDate: NOW },
  { label: 'I år', fromDate: NOW.startOf('year'), toDate: NOW },
  { label: 'I fjor', fromDate: LAST_YEAR_START, toDate: LAST_YEAR_END },
];

export const Filters = () => {
  const { data: userData } = useGetUserDataQuery();
  const stats = useAllTotalStatistics();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEnheter = useQueryFilters(QueryParams.ENHETER);
  const selectedKlageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
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

  const resetFilters = () =>
    setSearchParams({
      [QueryParams.KLAGEENHETER]: userData?.ansattEnhet.navn ?? '',
      [QueryParams.FROM_DATE]: FORMATTED_30_DAYS_AGO,
      [QueryParams.TO_DATE]: FORMATTED_NOW,
    });

  const setPreset = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
    setFilter(QueryParams.FROM_DATE, from.format(FORMAT));
    setFilter(QueryParams.TO_DATE, to.format(FORMAT));
  };

  return (
    <Container>
      <StyledResetButton onClick={resetFilters} mini kompakt disabled={typeof userData === 'undefined'}>
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

      <DatePresets
        selectedFromDate={fromDate}
        selectedToDate={toDate}
        options={datePresets}
        setPreset={setPreset}
        queryFormat={FORMAT}
        prettyFormat={PRETTY_FORMAT}
      />

      <KlageenheterFilter
        stats={stats}
        selected={selectedKlageenheter}
        setSelected={(values) => setFilter(QueryParams.KLAGEENHETER, ...values)}
      />
      <EnheterFilter
        stats={stats}
        selected={selectedEnheter}
        setSelected={(values) => setFilter(QueryParams.ENHETER, ...values)}
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
        <SelectedEnheterFilters
          values={selectedKlageenheter}
          type="klageenheter"
          category="klageenhet"
          setFilter={setFilter}
        />
        <SelectedEnheterFilters
          values={selectedEnheter}
          type="enheter"
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
  z-index: 1;
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
