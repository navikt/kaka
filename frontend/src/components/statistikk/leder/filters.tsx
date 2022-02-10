import dayjs from 'dayjs';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { ReadOnlySelect } from '../../../styled-components/filters-and-content';
import { FilterPanelContainer, StyledResetButton } from '../../filters/common/styled-components';
import { MONTH_FORMAT, NOW, PRETTY_FORMAT } from '../../filters/date-presets/constants';
import { DatePresets } from '../../filters/date-presets/date-presets';
import { getLastTertial } from '../../filters/date-presets/get-last-tertial';
import { IOption } from '../../filters/date-presets/types';
import { QueryParams } from '../../filters/filter-query-params';
import { HjemmelFilter } from '../../filters/hjemler';
import { useFromMonthQueryFilter, useQueryFilters, useToMonthQueryFilter } from '../../filters/hooks/use-query-filter';
import { MonthFilter } from '../../filters/month';
import { FilteredHjemlerPills } from '../../filters/pills/hjemler';
import { PillContainer, SelectedFilters } from '../../filters/pills/pills';
import { FilteredSaksbehandlerPills } from '../../filters/pills/saksbehandler';
import { SaksbehandlerFilter } from '../../filters/saksbehandler';
import { SakstypeFilter } from '../../filters/sakstyper';
import { UtfallFilter } from '../../filters/utfall';
import { YtelseFilter } from '../../filters/ytelser';
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
    <FilterPanelContainer>
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
        utfallList={stats}
        selected={selectedUtfall}
        setSelected={(values) => setFilter(QueryParams.UTFALL, ...values)}
      />
      <SakstypeFilter
        sakstypeList={stats}
        selected={selectedTypes}
        setSelected={(values) => setFilter(QueryParams.TYPES, ...values)}
      />
      <YtelseFilter
        ytelseList={stats}
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
    </FilterPanelContainer>
  );
};