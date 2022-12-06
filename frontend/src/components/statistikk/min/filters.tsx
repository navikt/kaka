import { Button, Label } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { format, parse, subMonths } from 'date-fns';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { isNotNull } from '../../../functions/is-not';
import { useYtelserForKlageenhet } from '../../../hooks/use-kodeverk-value';
import { useUser } from '../../../simple-api-state/use-user';
import { DatepickerWithValidation } from '../../date-picker/date-picker';
import { DateContainer, FilterPanelContainer } from '../../filters/common/styled-components';
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
} from '../../filters/date-presets/constants';
import { DatePresets } from '../../filters/date-presets/date-presets';
import { getLastTertial } from '../../filters/date-presets/get-last-tertial';
import { IOption } from '../../filters/date-presets/types';
import { QueryParams } from '../../filters/filter-query-params';
import { HjemmelFilter } from '../../filters/hjemler';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
} from '../../filters/hooks/use-query-filter';
import {
  EnheterPills,
  HjemlerPills,
  PillContainer,
  SakstyperPills,
  UtfallPills,
  YtelserPills,
} from '../../filters/pills/pills';
import { ResetDateButton } from '../../filters/reset-date';
import { SakstypeFilter } from '../../filters/sakstyper';
import { TilbakekrevingFilter } from '../../filters/tilbakekreving';
import { TilbakekrevingEnum } from '../../filters/types';
import { UtfallFilter } from '../../filters/utfall';
import { YtelseFilter } from '../../filters/ytelser';

const datePresets: IOption[] = [
  {
    label: 'Denne måneden',
    fromDate: START_OF_MONTH,
    toDate: NOW,
  },
  { label: 'Siste tertial', ...getLastTertial(NOW) },
  { label: 'Nest siste tertial', ...getLastTertial(subMonths(NOW, 4)) },
  { label: 'Siste 12 mnd', fromDate: ONE_YEAR_AGO, toDate: NOW },
  { label: 'I år', fromDate: START_OF_YEAR, toDate: NOW },
  { label: 'I fjor', fromDate: LAST_YEAR_START, toDate: LAST_YEAR_END },
];

export const Filters = () => {
  const { data: userData } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTypes = useQueryFilters(QueryParams.TYPES);
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const selectedTilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  // Dates
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const ytelser = useYtelserForKlageenhet(userData?.ansattEnhet.id ?? skipToken, 1); // TODO: Set real version

  const setFilter = (filter: QueryParams, ...values: (string | number | null)[]) => {
    const v = values.filter(isNotNull);

    if (v.length === 0) {
      searchParams.delete(filter);
    } else {
      searchParams.set(filter, v.join(','));
    }

    setSearchParams(searchParams);
  };

  const resetFilters = () =>
    setSearchParams({
      [QueryParams.FROM_DATE]: FORMATTED_START_OF_MONTH,
      [QueryParams.TO_DATE]: FORMATTED_NOW,
    });

  const setPreset = (from: Date, to: Date) => {
    setFilter(QueryParams.FROM_DATE, format(from, FORMAT));
    setFilter(QueryParams.TO_DATE, format(to, FORMAT));
  };

  return (
    <FilterPanelContainer>
      <Button variant="secondary" size="small" onClick={resetFilters}>
        Nullstill filter
      </Button>
      <DatepickerWithValidation
        label={
          <DateContainer>
            <Label as="span">Fra og med</Label>
            <ResetDateButton
              date={FORMATTED_START_OF_MONTH}
              selectedDate={fromDate}
              onClick={(date) => setFilter(QueryParams.FROM_DATE, date)}
              title={PRETTY_START_OF_MONTH}
            />
          </DateContainer>
        }
        id="from-date"
        onChange={(value) => setFilter(QueryParams.FROM_DATE, value)}
        value={fromDate}
        toDate={parse(toDate, FORMAT, new Date())}
        size="small"
      />
      <DatepickerWithValidation
        label={
          <DateContainer>
            <Label as="span">Til og med</Label>
            <ResetDateButton
              date={FORMATTED_NOW}
              selectedDate={toDate}
              onClick={(date) => setFilter(QueryParams.TO_DATE, date)}
              title="Nå"
            />
          </DateContainer>
        }
        id="to-date"
        value={toDate}
        fromDate={parse(fromDate, FORMAT, new Date())}
        onChange={(value) => setFilter(QueryParams.TO_DATE, value)}
        size="small"
      />
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
      <HjemmelFilter selected={selectedHjemler} setSelected={(values) => setFilter(QueryParams.HJEMLER, ...values)} />

      <PillContainer>
        <EnheterPills setFilter={setFilter} />
        <UtfallPills setFilter={setFilter} />
        <SakstyperPills setFilter={setFilter} />
        <YtelserPills setFilter={setFilter} />
        <HjemlerPills setFilter={setFilter} />
      </PillContainer>

      <TilbakekrevingFilter
        selected={selectedTilbakekreving}
        setSelected={(value) => setFilter(QueryParams.TILBAKEKREVING, value)}
      />
    </FilterPanelContainer>
  );
};
