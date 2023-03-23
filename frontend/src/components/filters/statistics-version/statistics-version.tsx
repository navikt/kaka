import { HelpText, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { QueryParams } from '../filter-query-params';
import { useVersionQueryFilter } from '../hooks/use-query-filter';
import { DefaultParams } from './default-params';

interface Props {
  defaultParamsV1: DefaultParams;
  defaultParamsV2: DefaultParams;
}

export const StatisticsVersionFilter = ({ defaultParamsV1, defaultParamsV2 }: Props) => {
  const version = useVersionQueryFilter();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (kvVersion: string) => {
    searchParams.set(QueryParams.VERSION, kvVersion);

    const versionAsNumber = parseInt(kvVersion, 10);

    if (versionAsNumber === KvalitetsvurderingVersion.V1) {
      Object.entries(defaultParamsV1).forEach(([key, value]) => searchParams.set(key, value));
    } else if (versionAsNumber === KvalitetsvurderingVersion.V2) {
      Object.entries(defaultParamsV2).forEach(([key, value]) => searchParams.set(key, value));
    }

    setSearchParams(searchParams, { replace: true });
  };

  return (
    <ToggleGroup onChange={onChange} value={version.toString()} size="small" label={<Label />}>
      <ToggleGroup.Item value={KvalitetsvurderingVersion.V1.toString()}>t.o.m. 2022</ToggleGroup.Item>
      <ToggleGroup.Item value={KvalitetsvurderingVersion.V2.toString()}>f.o.m. 2023</ToggleGroup.Item>
    </ToggleGroup>
  );
};

const Label = () => (
  <StyledLabel>
    Statistikkversjon
    <HelpText placement="right">
      Kaka har fått en ny versjon som gjelder fra 1. januar 2023. Her kan du velge hvilket år du vil se statistikk for.
      Fordi vi har gjort endringer i hva vi måler, kan du ikke se statistikk på tvers av 2022 og 2023.
    </HelpText>
  </StyledLabel>
);

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
