import dayjs from 'dayjs';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useKodeverkYtelser } from '../../../hooks/use-kodeverk-value';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { ExcelExport } from '../../excel-export/excel-export';
import { DateContainer, FilterPanelContainer, StyledResetButton } from '../../filters/common/styled-components';
import { DateFilter } from '../../filters/date';
import {
  FORMAT,
  LAST_YEAR_END,
  LAST_YEAR_START,
  NOW,
  ONE_YEAR_AGO,
  PRETTY_FORMAT,
  START_OF_MONTH,
} from '../../filters/date-presets/constants';
import { DatePresets } from '../../filters/date-presets/date-presets';
import { getLastTertial } from '../../filters/date-presets/get-last-tertial';
import { IOption } from '../../filters/date-presets/types';
import { QueryParams } from '../../filters/filter-query-params';
import { HjemmelFilter } from '../../filters/hjemler';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../filters/hooks/use-query-filter';
import { KlageenheterFilter } from '../../filters/klageenheter';
import { SelectedEnheterFilters } from '../../filters/pills/enhet';
import { FilteredHjemlerPills } from '../../filters/pills/hjemler';
import { PillContainer, SelectedFilters } from '../../filters/pills/pills';
import { ResetDateButton } from '../../filters/reset-date';
import { SakstypeFilter } from '../../filters/sakstyper';
import { UtfallFilter } from '../../filters/utfall';
import { VedtaksenheterFilter } from '../../filters/vedtaksenheter';
import { YtelseFilter } from '../../filters/ytelser';

const FORMATTED_NOW = NOW.format('YYYY-MM-DD');
const FORMATTED_START_OF_MONTH = START_OF_MONTH.format('YYYY-MM-DD');
const PRETTY_START_OF_MONTH = START_OF_MONTH.format('DD.MM.YYYY');

const datePresets: IOption[] = [
  {
    label: 'Denne måneden',
    fromDate: START_OF_MONTH,
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
  const selectedKlageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const selectedTypes = useQueryFilters(QueryParams.TYPES);
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  // Dates
  const fromDate = useFromDateQueryFilter();
  const toDate = useToDateQueryFilter();

  const ytelser = useKodeverkYtelser();

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
      [QueryParams.KLAGEENHETER]: userData?.ansattEnhet.id ?? '',
      [QueryParams.FROM_DATE]: FORMATTED_START_OF_MONTH,
      [QueryParams.TO_DATE]: FORMATTED_NOW,
    });

  const setPreset = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
    setFilter(QueryParams.FROM_DATE, from.format(FORMAT));
    setFilter(QueryParams.TO_DATE, to.format(FORMAT));
  };

  return (
    <FilterPanelContainer>
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
          date={FORMATTED_START_OF_MONTH}
          selectedDate={fromDate}
          onClick={(date) => setFilter(QueryParams.FROM_DATE, date)}
          title={PRETTY_START_OF_MONTH}
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
        selected={selectedKlageenheter}
        setSelected={(values) => setFilter(QueryParams.KLAGEENHETER, ...values)}
      />
      <VedtaksenheterFilter
        selected={selectedEnheter}
        setSelected={(values) => setFilter(QueryParams.ENHETER, ...values)}
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
    </FilterPanelContainer>
  );
};
