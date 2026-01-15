import { PillContainer } from '@app/components/filters/pills/styled-components';
import { YtelseFilter, YtelsegrupperFilter } from '@app/components/filters/ytelser-and-hjemler';
import { isNotNull } from '@app/functions/is-not';
import { useYtelser } from '@app/simple-api-state/use-kodeverk';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { ArrowUndoIcon } from '@navikt/aksel-icons';
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
  useToDateQueryFilter,
  useVersionQueryFilter,
} from '../../filters/hooks/use-query-filter';
import { useValidDateInterval } from '../../filters/hooks/use-valid-date-interval';
import { SakstyperPills, UtfallPills, YtelsegrupperPills, YtelserPills } from '../../filters/pills/pills';
import { ResetDateButton } from '../../filters/reset-date';
import { SakstypeFilter } from '../../filters/sakstyper';
import { StatisticsVersionFilter } from '../../filters/statistics-version/statistics-version';
import { UtfallFilter } from '../../filters/utfall';

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTypes = useSakstypeFilter();
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedYtelsegrupper = useQueryFilters(QueryParams.YTELSESGRUPPER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);

  // Dates
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const version = useVersionQueryFilter();

  const datePresets = useDatePresets();

  const { data: ytelser = [] } = useYtelser(version);

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
      <Button variant="secondary" size="small" icon={<ArrowUndoIcon aria-hidden />} onClick={resetFilters}>
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
      <YtelsegrupperFilter selected={selectedYtelsegrupper} setFilter={setFilter} />
      <YtelseFilter selected={selectedYtelser} setFilter={setFilter} ytelser={ytelser} />

      <PillContainer>
        <UtfallPills setFilter={setFilter} />
        <SakstyperPills setFilter={setFilter} />
        <YtelsegrupperPills setFilter={setFilter} />
        <YtelserPills setFilter={setFilter} />
      </PillContainer>
    </FilterPanelContainer>
  );
};
