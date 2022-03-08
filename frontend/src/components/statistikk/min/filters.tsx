import { skipToken } from '@reduxjs/toolkit/dist/query';
import dayjs from 'dayjs';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useYtelserForKlageenhet } from '../../../hooks/use-kodeverk-value';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { DateContainer, FilterPanelContainer, StyledResetButton } from '../../filters/common/styled-components';
import { DateFilter } from '../../filters/date';
import {
  FORMAT,
  LAST_YEAR_END,
  LAST_YEAR_START,
  NOW,
  ONE_YEAR_AGO,
  PRETTY_FORMAT,
} from '../../filters/date-presets/constants';
import { DatePresets } from '../../filters/date-presets/date-presets';
import { getLastTertial } from '../../filters/date-presets/get-last-tertial';
import { IOption } from '../../filters/date-presets/types';
import { QueryParams } from '../../filters/filter-query-params';
import { HjemmelFilter } from '../../filters/hjemler';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../filters/hooks/use-query-filter';
import { FilteredHjemlerPills } from '../../filters/pills/hjemler';
import { PillContainer, SelectedFilters } from '../../filters/pills/pills';
import { ResetDateButton } from '../../filters/reset-date';
import { SakstypeFilter } from '../../filters/sakstyper';
import { UtfallFilter } from '../../filters/utfall';
import { YtelseFilter } from '../../filters/ytelser';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEnheter = useQueryFilters(QueryParams.ENHETER);
  const selectedTypes = useQueryFilters(QueryParams.TYPES);
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  // Dates
  const fromDate = useFromDateQueryFilter();
  const toDate = useToDateQueryFilter();

  const ytelser = useYtelserForKlageenhet(userData?.ansattEnhet.navn ?? skipToken);

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
      [QueryParams.FROM_DATE]: FORMATTED_30_DAYS_AGO,
      [QueryParams.TO_DATE]: FORMATTED_NOW,
    });

  const setPreset = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
    setFilter(QueryParams.FROM_DATE, from.format(FORMAT));
    setFilter(QueryParams.TO_DATE, to.format(FORMAT));
  };

  return (
    <FilterPanelContainer>
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

      <DatePresets
        selectedFromDate={fromDate}
        selectedToDate={toDate}
        options={datePresets}
        setPreset={setPreset}
        queryFormat={FORMAT}
        prettyFormat={PRETTY_FORMAT}
      />

      <UtfallFilter selected={selectedUtfall} setSelected={(values) => setFilter(QueryParams.UTFALL, ...values)} />
      <SakstypeFilter selected={selectedTypes} setSelected={(values) => setFilter(QueryParams.TYPES, ...values)} />
      <YtelseFilter
        selected={selectedYtelser}
        setSelected={(values) => setFilter(QueryParams.YTELSER, ...values)}
        ytelser={ytelser}
      />
      <HjemmelFilter
        selected={selectedHjemler}
        setSelected={(values) => setFilter(QueryParams.HJEMLER, ...values)}
        ytelser={ytelser}
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
      </PillContainer>
    </FilterPanelContainer>
  );
};
