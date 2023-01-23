import { Cancel } from '@navikt/ds-icons';
import { Button, HelpText, Label } from '@navikt/ds-react';
import { format, parse } from 'date-fns';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { isNotNull } from '../../../functions/is-not';
import { useYtelser } from '../../../simple-api-state/use-kodeverk';
import { useUser } from '../../../simple-api-state/use-user';
import { DatepickerWithValidation } from '../../date-picker/date-picker';
import { DateContainer, FilterPanelContainer, StyledHr } from '../../filters/common/styled-components';
import { ComparisonProp } from '../../filters/comparison/comparison-prop';
import { ComparisonValues } from '../../filters/comparison/comparison-values/comparison-values';
import { useComparisonProp } from '../../filters/comparison/comparison-values/use-prop';
import {
  FORMAT,
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
  NOW,
  PRETTY_FORMAT,
  PRETTY_START_OF_MONTH,
} from '../../filters/date-presets/constants';
import { DatePresets } from '../../filters/date-presets/date-presets';
import { ComparableQueryParams, QueryParams } from '../../filters/filter-query-params';
import { HjemmelFilter } from '../../filters/hjemler';
import { useDatePresets } from '../../filters/hooks/use-date-presets';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
  useVersionQueryFilter,
} from '../../filters/hooks/use-query-filter';
import { useValidDateInterval } from '../../filters/hooks/use-valid-date-interval';
import { KlageenheterFilter } from '../../filters/klageenheter';
import {
  EnheterPills,
  HjemlerPills,
  KlageenheterPills,
  PillContainer,
  SakstyperPills,
  UtfallPills,
  VedtaksinstansgrupperPills,
  YtelserPills,
} from '../../filters/pills/pills';
import { ResetDateButton } from '../../filters/reset-date';
import { SakstypeFilter } from '../../filters/sakstyper';
import { DEFAULT_PARAMS_V1, DEFAULT_PARAMS_V2 } from '../../filters/statistics-version/default-params';
import { StatisticsVersionFilter } from '../../filters/statistics-version/statistics-version';
import { TilbakekrevingFilter } from '../../filters/tilbakekreving';
import { TilbakekrevingEnum } from '../../filters/types';
import { UtfallFilter } from '../../filters/utfall';
import { VedtaksenheterFilter } from '../../filters/vedtaksenheter';
import { YtelseFilter } from '../../filters/ytelser';
import { VedtaksinstansgruppeFilter } from '../total/vedtaksinstansgruppe-filter';

export const Filters = () => {
  const { data: userData } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEnheter = useQueryFilters(QueryParams.ENHETER);
  const selectedKlageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const selectedTypes = useQueryFilters(QueryParams.TYPES);
  const selectedYtelser = useQueryFilters(QueryParams.YTELSER);
  const selectedUtfall = useQueryFilters(QueryParams.UTFALL);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const selectedVedtaksinstansgrupper = useQueryFilters(QueryParams.VEDTAKSINSTANSGRUPPER);
  const selectedTilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);
  const selectedComparisonProp = useComparisonProp();

  // Dates
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  const version = useVersionQueryFilter();

  const { data: ytelser = [] } = useYtelser(version);

  const datePresets = useDatePresets();
  const { validFrom, validTo } = useValidDateInterval();

  const mainDatepickerDisabled = selectedComparisonProp === ComparableQueryParams.DATE_INTERVALS;

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
      <Button
        variant="secondary"
        size="small"
        icon={<Cancel aria-hidden />}
        onClick={resetFilters}
        disabled={typeof userData === 'undefined'}
      >
        Nullstill filter
      </Button>

      <StatisticsVersionFilter defaultParamsV1={DEFAULT_PARAMS_V1} defaultParamsV2={DEFAULT_PARAMS_V2} />

      <StyledHr />

      <StyledDate>
        <DatepickerAndPresets>
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
            fromDate={validFrom}
            toDate={parse(toDate, FORMAT, NOW)}
            size="small"
            disabled={mainDatepickerDisabled}
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
            fromDate={parse(fromDate, FORMAT, NOW)}
            toDate={validTo}
            onChange={(value) => setFilter(QueryParams.TO_DATE, value)}
            size="small"
            disabled={mainDatepickerDisabled}
          />

          <DatePresets
            selectedFromDate={fromDate}
            selectedToDate={toDate}
            options={datePresets}
            setPreset={setPreset}
            queryFormat={FORMAT}
            prettyFormat={PRETTY_FORMAT}
            disabled={mainDatepickerDisabled}
          />
        </DatepickerAndPresets>
        <DatepickerDisabledWarning mainDatepickerDisabled={mainDatepickerDisabled} />
      </StyledDate>

      <KlageenheterFilter
        selected={selectedKlageenheter}
        setSelected={(values) => setFilter(QueryParams.KLAGEENHETER, ...values)}
      />

      <VedtaksinstansgruppeFilter
        selected={selectedVedtaksinstansgrupper}
        setSelected={(values) => setFilter(QueryParams.VEDTAKSINSTANSGRUPPER, ...values)}
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
      <HjemmelFilter selected={selectedHjemler} setSelected={(values) => setFilter(QueryParams.HJEMLER, ...values)} />

      <PillContainer>
        <KlageenheterPills setFilter={setFilter} />
        <VedtaksinstansgrupperPills setFilter={setFilter} />
        <EnheterPills setFilter={setFilter} />
        <UtfallPills setFilter={setFilter} />
        <SakstyperPills setFilter={setFilter} />
        <YtelserPills setFilter={setFilter} />
        <HjemlerPills setFilter={setFilter} />
      </PillContainer>
      <StyledHr />

      <TilbakekrevingFilter
        selected={selectedTilbakekreving}
        setSelected={(value) => setFilter(QueryParams.TILBAKEKREVING, value)}
      />

      <StyledHr />

      <ComparisonProp />
      <ComparisonValues />
    </FilterPanelContainer>
  );
};

interface DatepickerDisabledWarningProps {
  mainDatepickerDisabled: boolean;
}

const DatepickerDisabledWarning = ({ mainDatepickerDisabled }: DatepickerDisabledWarningProps) => {
  if (!mainDatepickerDisabled) {
    return null;
  }

  return <HelpText>Dato kan ikke settes da dette er overstyrt av sammenlikning på tvers.</HelpText>;
};

const StyledDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DatepickerAndPresets = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
