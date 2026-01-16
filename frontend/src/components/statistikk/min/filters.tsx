import { PillContainer } from '@app/components/filters/pills/styled-components';
import { YtelserAndHjemler } from '@app/components/filters/ytelser-and-hjemler';
import { isNotNull } from '@app/functions/is-not';
import { useYtelserForKlageenhet } from '@app/hooks/use-kodeverk-value';
import { useUser } from '@app/simple-api-state/use-user';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { Button, Label } from '@navikt/ds-react';
import { format, parse } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { DatepickerWithValidation } from '../../date-picker/date-picker';
import { DateContainer, FilterPanelContainer, StyledHr } from '../../filters/common/styled-components';
import {
  FORMAT,
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
  PRETTY_FORMAT,
  PRETTY_START_OF_MONTH,
} from '../../filters/date-presets/constants';
import { DatePresets } from '../../filters/date-presets/date-presets';
import { QueryParams } from '../../filters/filter-query-params';
import { useDatePresets } from '../../filters/hooks/use-date-presets';
import { useDefaultDates } from '../../filters/hooks/use-default-dates';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useSakstypeFilter,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
  useVersionQueryFilter,
} from '../../filters/hooks/use-query-filter';
import { useValidDateInterval } from '../../filters/hooks/use-valid-date-interval';
import {
  EnheterPills,
  HjemlerPills,
  SakstyperPills,
  UtfallPills,
  YtelsegrupperPills,
  YtelserPills,
} from '../../filters/pills/pills';
import { ResetDateButton } from '../../filters/reset-date';
import { SakstypeFilter } from '../../filters/sakstyper';
import { StatisticsVersionFilter } from '../../filters/statistics-version/statistics-version';
import { TilbakekrevingFilter } from '../../filters/tilbakekreving';
import { TilbakekrevingEnum } from '../../filters/types';
import { UtfallFilter } from '../../filters/utfall';

export const Filters = () => {
  const userData = useUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTypes = useSakstypeFilter();
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedYtelsegrupper = useQueryFilters(QueryParams.YTELSESGRUPPER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const selectedTilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  // Dates
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const version = useVersionQueryFilter();
  const datePresets = useDatePresets();

  const ytelser = useYtelserForKlageenhet(userData.ansattEnhet.id, version);

  const { defaultFrom, defaultTo } = useDefaultDates();
  const { validFrom, validTo } = useValidDateInterval();

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
      [QueryParams.VERSION]: KvalitetsvurderingVersion.V2.toString(10),
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

      <StatisticsVersionFilter />

      <StyledHr />

      <DatepickerWithValidation
        label={
          <DateContainer>
            <Label as="span">Fra og med</Label>
            <ResetDateButton
              date={defaultFrom}
              selectedDate={fromDate}
              onClick={(date) => setFilter(QueryParams.FROM_DATE, date)}
              title={PRETTY_START_OF_MONTH}
            />
          </DateContainer>
        }
        id="from-date"
        onChange={(value) => setFilter(QueryParams.FROM_DATE, value)}
        value={fromDate}
        fromDate={validFrom}
        toDate={parse(toDate, FORMAT, new Date())}
        size="small"
      />
      <DatepickerWithValidation
        label={
          <DateContainer>
            <Label as="span">Til og med</Label>
            <ResetDateButton
              date={defaultTo}
              selectedDate={toDate}
              onClick={(date) => setFilter(QueryParams.TO_DATE, date)}
              title="Nå"
            />
          </DateContainer>
        }
        id="to-date"
        value={toDate}
        fromDate={parse(fromDate, FORMAT, new Date())}
        toDate={validTo}
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
      <YtelserAndHjemler
        selectedYtelser={selectedYtelser}
        selectedYtelsegrupper={selectedYtelsegrupper}
        selectedHjemler={selectedHjemler}
        setFilter={setFilter}
        ytelser={ytelser}
      />
      <PillContainer>
        <EnheterPills setFilter={setFilter} />
        <UtfallPills setFilter={setFilter} />
        <SakstyperPills setFilter={setFilter} />
        <YtelsegrupperPills setFilter={setFilter} />
        <YtelserPills setFilter={setFilter} />
        <HjemlerPills setFilter={setFilter} />
      </PillContainer>

      <StyledHr />

      <TilbakekrevingFilter
        selected={selectedTilbakekreving}
        setSelected={(value) => setFilter(QueryParams.TILBAKEKREVING, value)}
      />
    </FilterPanelContainer>
  );
};
