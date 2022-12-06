import { Button, Select } from '@navikt/ds-react';
import { format } from 'date-fns';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useYtelser } from '../../../simple-api-state/use-kodeverk';
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
import {
  useFromMonthQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToMonthQueryFilter,
} from '../../filters/hooks/use-query-filter';
import { MonthFilter } from '../../filters/month';
import {
  EnheterPills,
  HjemlerPills,
  PillContainer,
  SaksbehandlerPills,
  SakstyperPills,
  UtfallPills,
  YtelserPills,
} from '../../filters/pills/pills';
import { SaksbehandlerFilter } from '../../filters/saksbehandler';
import { SakstypeFilter } from '../../filters/sakstyper';
import { TilbakekrevingFilter } from '../../filters/tilbakekreving';
import { TilbakekrevingEnum } from '../../filters/types';
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

  const selectedTypes = useQueryFilters(QueryParams.TYPES);
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const selectedSaksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);
  const selectedTilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  // Dates
  const fromMonth = useFromMonthQueryFilter(FORMATTED_START_OF_LAST_MONTH);
  const toMonth = useToMonthQueryFilter(FORMATTED_END_OF_LAST_MONTH);

  const { data: ytelser = [] } = useYtelser(1); // TODO: Set real version.

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
        <EnheterPills setFilter={setFilter} />
        <UtfallPills setFilter={setFilter} />
        <SakstyperPills setFilter={setFilter} />
        <YtelserPills setFilter={setFilter} />
        <HjemlerPills setFilter={setFilter} />
        <SaksbehandlerPills setFilter={setFilter} />
      </PillContainer>

      <TilbakekrevingFilter
        selected={selectedTilbakekreving}
        setSelected={(value) => setFilter(QueryParams.TILBAKEKREVING, value)}
      />
    </FilterPanelContainer>
  );
};
