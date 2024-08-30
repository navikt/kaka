import { useYtelser } from '@app/simple-api-state/use-kodeverk';
import { useUser } from '@app/simple-api-state/use-user';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { Button, Select } from '@navikt/ds-react';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { FilterPanelContainer, StyledHr } from '../../filters/common/styled-components';
import {
  FORMATTED_END_OF_LAST_MONTH,
  FORMATTED_LAST_MONTH,
  FORMATTED_START_OF_LAST_MONTH,
  IS_BEFORE_FEBRUARY_2023,
  MONTH_FORMAT,
  PRETTY_FORMAT,
} from '../../filters/date-presets/constants';
import { DatePresets } from '../../filters/date-presets/date-presets';
import { QueryParams } from '../../filters/filter-query-params';
import { HjemmelFilter } from '../../filters/hjemler';
import { useDatePresetsLeder } from '../../filters/hooks/use-date-presets';
import {
  useFromMonthQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToMonthQueryFilter,
  useVersionQueryFilter,
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
import { DEFAULT_PARAMS_V1_LEDER, DEFAULT_PARAMS_V2_LEDER } from '../../filters/statistics-version/default-params';
import { StatisticsVersionFilter } from '../../filters/statistics-version/statistics-version';
import { TilbakekrevingFilter } from '../../filters/tilbakekreving';
import { TilbakekrevingEnum } from '../../filters/types';
import { UtfallFilter } from '../../filters/utfall';
import { YtelseFilter } from '../../filters/ytelser';

const DEFAULT_VERSION = IS_BEFORE_FEBRUARY_2023 ? KvalitetsvurderingVersion.V1 : KvalitetsvurderingVersion.V2;

export const Filters = () => {
  const userData = useUser();
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

  const datePresets = useDatePresetsLeder();

  const version = useVersionQueryFilter(DEFAULT_VERSION);

  const { data: ytelser = [] } = useYtelser(version);

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
      `?${QueryParams.FROM_MONTH}=${FORMATTED_LAST_MONTH}&${QueryParams.TO_MONTH}=${FORMATTED_LAST_MONTH}`,
    );

  const setPreset = (fromDate: Date, toDate: Date) => {
    setFilter(QueryParams.VERSION, DEFAULT_VERSION.toString(10));
    setFilter(QueryParams.FROM_MONTH, format(fromDate, MONTH_FORMAT));
    setFilter(QueryParams.TO_MONTH, format(toDate, MONTH_FORMAT));
  };

  return (
    <FilterPanelContainer>
      <Button variant="secondary" size="small" onClick={resetFilters}>
        Nullstill filter
      </Button>

      <StatisticsVersionFilter defaultParamsV1={DEFAULT_PARAMS_V1_LEDER} defaultParamsV2={DEFAULT_PARAMS_V2_LEDER} />

      <StyledHr />

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
        <option>{userData.ansattEnhet.navn}</option>
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

      <StyledHr />

      <TilbakekrevingFilter
        selected={selectedTilbakekreving}
        setSelected={(value) => setFilter(QueryParams.TILBAKEKREVING, value)}
      />
    </FilterPanelContainer>
  );
};
