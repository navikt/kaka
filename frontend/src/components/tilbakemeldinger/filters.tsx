import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import dayjs from 'dayjs';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useYtelserForVedtaksinstansenhet } from '../../hooks/use-kodeverk-value';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useGetSaksdatalisteLederVedtaksinstansQuery } from '../../redux-api/statistics';
import { ReadOnlySelect } from '../../styled-components/filters-and-content';
import { ISaksdatalisteLederVedtaksinstansParams } from '../../types/saksdata';
import { DateContainer, FilterPanelContainer, StyledResetButton } from '../filters/common/styled-components';
import { DateFilter } from '../filters/date';
import {
  FORMAT,
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
  LAST_YEAR_END,
  LAST_YEAR_START,
  NOW,
  ONE_YEAR_AGO,
  PRETTY_FORMAT,
  PRETTY_START_OF_MONTH,
  START_OF_MONTH,
  START_OF_YEAR,
} from '../filters/date-presets/constants';
import { DatePresets } from '../filters/date-presets/date-presets';
import { getLastTertial } from '../filters/date-presets/get-last-tertial';
import { IOption } from '../filters/date-presets/types';
import { QueryParams } from '../filters/filter-query-params';
import { HjemmelFilter } from '../filters/hjemler';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../filters/hooks/use-query-filter';
import { KommentarerFilter } from '../filters/kommentarer';
import { MangelfulltFilter } from '../filters/mangelfullt';
import { FilteredHjemlerPills } from '../filters/pills/hjemler';
import { SelectedKommentarer } from '../filters/pills/kommentarer';
import { SelectedMangelfullt } from '../filters/pills/mangelfullt';
import { PillContainer, SelectedFilters } from '../filters/pills/pills';
import { ResetDateButton } from '../filters/reset-date';
import { UtfallFilter } from '../filters/utfall';
import { YtelseFilter } from '../filters/ytelser';

const datePresets: IOption[] = [
  {
    label: 'Denne måneden',
    fromDate: START_OF_MONTH,
    toDate: NOW,
  },
  { label: 'Siste tertial', ...getLastTertial(NOW) },
  { label: 'Nest siste tertial', ...getLastTertial(NOW.subtract(4, 'month')) },
  { label: 'Siste 12 mnd', fromDate: ONE_YEAR_AGO, toDate: NOW },
  { label: 'I år', fromDate: START_OF_YEAR, toDate: NOW },
  { label: 'I fjor', fromDate: LAST_YEAR_START, toDate: LAST_YEAR_END },
];

export const Filters = () => {
  const { data: userData } = useGetUserDataQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const selectedMangelfullt = useQueryFilters(QueryParams.MANGELFULLT);
  const selectedKommentarer = useQueryFilters(QueryParams.KOMMENTARER);

  // Dates
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const ytelser = useYtelserForVedtaksinstansenhet(userData?.ansattEnhet.id ?? skipToken);

  const query: ISaksdatalisteLederVedtaksinstansParams | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : {
          navIdent: userData.ident,
          fromDate,
          toDate,
          mangelfullt: selectedMangelfullt,
          kommentarer: selectedKommentarer,
        };
  const { data } = useGetSaksdatalisteLederVedtaksinstansQuery(query);

  if (typeof data === 'undefined') {
    return null;
  }

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

      <ReadOnlySelect disabled>
        <option>{userData?.ansattEnhet.navn}</option>
      </ReadOnlySelect>

      <UtfallFilter selected={selectedUtfall} setSelected={(values) => setFilter(QueryParams.UTFALL, ...values)} />

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

      <MangelfulltFilter
        selected={selectedMangelfullt}
        setSelected={(values) => setFilter(QueryParams.MANGELFULLT, ...values)}
      />

      <KommentarerFilter
        selected={selectedKommentarer}
        setSelected={(values) => setFilter(QueryParams.KOMMENTARER, ...values)}
      />

      <PillContainer>
        <SelectedFilters
          values={selectedUtfall}
          queryKey={QueryParams.UTFALL}
          kodeverkKey="utfall"
          category="utfall"
          setFilter={setFilter}
        />
        <SelectedFilters
          values={selectedYtelser}
          queryKey={QueryParams.YTELSER}
          kodeverkKey="ytelser"
          category="ytelse"
          setFilter={setFilter}
        />
        <SelectedMangelfullt values={selectedMangelfullt} setFilter={setFilter} />
        <SelectedKommentarer values={selectedKommentarer} setFilter={setFilter} />
        <FilteredHjemlerPills setFilter={setFilter} />
      </PillContainer>
    </FilterPanelContainer>
  );
};
