import { Button, Select } from '@navikt/ds-react';
import { format } from 'date-fns';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useUser } from '../../../simple-api-state/use-user';
import { FilterPanelContainer } from '../../filters/common/styled-components';
import {
  END_OF_LAST_MONTH,
  FORMATTED_END_OF_LAST_MONTH,
  FORMATTED_LAST_MONTH,
  FORMATTED_START_OF_LAST_MONTH,
  MONTH_FORMAT,
  NOW,
  PRETTY_FORMAT,
  START_OF_LAST_MONTH,
} from '../../filters/date-presets/constants';
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

const datePresets: IOption[] = [
  {
    label: 'Siste måned',
    fromDate: START_OF_LAST_MONTH,
    toDate: END_OF_LAST_MONTH,
  },
  { label: 'Siste tertial', ...getLastTertial(NOW) },
];

export const Filters = () => {
  const { data: userData } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEnheter = useQueryFilters(QueryParams.ENHETER);
  const selectedTypes = useQueryFilters(QueryParams.TYPES);
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const selectedSaksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);

  // Dates
  const fromMonth = useFromMonthQueryFilter(FORMATTED_START_OF_LAST_MONTH);
  const toMonth = useToMonthQueryFilter(FORMATTED_END_OF_LAST_MONTH);

  const ytelser = useKodeverkValueDefault('ytelser');

  const setFilter = (filter: QueryParams, ...values: (string | number)[]) => {
    if (values.length === 0) {
      searchParams.delete(filter);
    } else {
      searchParams.set(filter, values.join(','));
    }

    setSearchParams(searchParams);
  };

  const resetFilters = () =>
    setSearchParams(
      `?${QueryParams.FROM_MONTH}=${FORMATTED_LAST_MONTH}&${QueryParams.TO_MONTH}=${FORMATTED_LAST_MONTH}`
    );

  const setPreset = (fromDate: Date, toDate: Date) => {
    setFilter(QueryParams.FROM_MONTH, format(fromDate, MONTH_FORMAT));
    setFilter(QueryParams.TO_MONTH, format(toDate, MONTH_FORMAT));
  };

  return (
    <FilterPanelContainer>
      <Button variant="secondary" size="small" onClick={resetFilters}>
        Nullstill filter
      </Button>

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

      <Select disabled aria-readonly label="Enhet" hideLabel size="small">
        <option>{userData?.ansattEnhet.navn}</option>
      </Select>

      <SaksbehandlerFilter
        selected={selectedSaksbehandlere}
        setSelected={(values) => setFilter(QueryParams.SAKSBEHANDLERE, ...values)}
      />

      <UtfallFilter selected={selectedUtfall} setSelected={(values) => setFilter(QueryParams.UTFALL, ...values)} />
      <SakstypeFilter selected={selectedTypes} setSelected={(values) => setFilter(QueryParams.TYPES, ...values)} />
      <YtelseFilter
        selected={selectedYtelser}
        setSelected={(values) => setFilter(QueryParams.YTELSER, ...values)}
        ytelser={ytelser}
      />
      <HjemmelFilter selected={selectedHjemler} setSelected={(values) => setFilter(QueryParams.HJEMLER, ...values)} />

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
