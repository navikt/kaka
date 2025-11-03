import { IS_BEFORE_2026 } from '@app/components/filters/date-presets/constants';
import { ENVIRONMENT } from '@app/environment';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { HelpText, List, ToggleGroup } from '@navikt/ds-react';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { QueryParams } from '../filter-query-params';
import { useVersionQueryFilter } from '../hooks/use-query-filter';
import { DEFAULT_PARAMS_V1, DEFAULT_PARAMS_V2, DEFAULT_PARAMS_V3, type DefaultParams } from './default-params';

type DefaultParamsMap = Record<KvalitetsvurderingVersion, DefaultParams>;

interface Props {
  defaultParams?: DefaultParamsMap;
}

const DEFAULT_PARAMS: DefaultParamsMap = {
  [KvalitetsvurderingVersion.V1]: DEFAULT_PARAMS_V1,
  [KvalitetsvurderingVersion.V2]: DEFAULT_PARAMS_V2,
  [KvalitetsvurderingVersion.V3]: DEFAULT_PARAMS_V3,
};

export const StatisticsVersionFilter = ({ defaultParams = DEFAULT_PARAMS }: Props) => {
  const version = useVersionQueryFilter();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (kvVersion: string) => {
    searchParams.set(QueryParams.VERSION, kvVersion);

    const versionAsNumber = Number.parseInt(kvVersion, 10);

    for (const [key, value] of Object.entries(getDefaultParams(versionAsNumber, defaultParams))) {
      searchParams.set(key, value);
    }

    setSearchParams(searchParams, { replace: true });
  };

  return (
    <ToggleGroup onChange={onChange} value={version.toString(10)} size="small" label={<Label />}>
      <ToggleGroup.Item value={KvalitetsvurderingVersion.V1.toString(10)}>t.o.m. 2022</ToggleGroup.Item>
      <ToggleGroup.Item value={KvalitetsvurderingVersion.V2.toString(10)}>2023-2025</ToggleGroup.Item>
      {IS_BEFORE_2026 && ENVIRONMENT.isProduction ? null : (
        <ToggleGroup.Item value={KvalitetsvurderingVersion.V3.toString(10)}>f.o.m. 2026</ToggleGroup.Item>
      )}
    </ToggleGroup>
  );
};

const Label = () => (
  <StyledLabel>
    Statistikkversjon
    {IS_BEFORE_2026 && ENVIRONMENT.isProduction ? (
      <HelpText placement="right">
        Kaka har fått en ny versjon som gjelder fra 1. januar 2023. Her kan du velge hvilket år du vil se statistikk
        for. Fordi vi har gjort endringer i hva vi måler, kan du ikke se statistikk på tvers av 2022 og 2023.
      </HelpText>
    ) : (
      <HelpText placement="right">
        Kaka har fått en ny versjon som gjelder fra 1. januar 2026. Her kan du velge hvilket år du vil se statistikk
        for. Fordi vi har gjort endringer i hva vi måler, kan du ikke se statistikk på tvers av følgende perioder:
        <List>
          <List.Item>alt til og med 2022</List.Item>
          <List.Item>hele 2023, 2024 og 2025</List.Item>
          <List.Item>alt fra og med 2026</List.Item>
        </List>
      </HelpText>
    )}
  </StyledLabel>
);

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const getDefaultParams = (version: KvalitetsvurderingVersion, params: DefaultParamsMap): DefaultParams => {
  switch (version) {
    case KvalitetsvurderingVersion.V1:
      return params[KvalitetsvurderingVersion.V1];
    case KvalitetsvurderingVersion.V2:
      return params[KvalitetsvurderingVersion.V2];
    case KvalitetsvurderingVersion.V3:
      return params[KvalitetsvurderingVersion.V3];
  }
};
