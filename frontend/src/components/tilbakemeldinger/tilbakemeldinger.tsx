import React from 'react';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../styled-components/cards';
import { ContentArea, FilterSection, FiltersAndContentContainer } from '../../styled-components/filters-and-content';
import { Table } from '../kvalitetsregistreringer/table';
import { LoadingOverlay } from '../loader/overlay';
import { CardSize, DynamicCard } from '../statistikk/card/card';
import { Hjemler } from '../statistikk/charts/hjemler';
import { Kvalitetsvurderinger } from '../statistikk/charts/kvalitetsvurderinger';
import { UtfallGraph } from '../statistikk/charts/utfall-graph';
import { Finished } from '../statistikk/key-stats/finished';
import { Omgjort } from '../statistikk/key-stats/omgjort';
import { StyledCharts } from '../statistikk/styled-components';
import { ToggleKvalitetsvurdering } from '../statistikk/toggle-kvalitetsvurdering';
import { Filters } from './filters';
import { useFilteredSaksdata, useSaksdataIsLoading } from './hooks/use-filtered-saksdata';
import { useFilteredTotalStatistics } from './hooks/use-filtered-statistics';

export const Tilbakemeldinger = () => {
  const saksdata = useFilteredSaksdata();
  const stats = useFilteredTotalStatistics();

  const isLoading = useSaksdataIsLoading();

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <FiltersAndContentContainer>
        <FilterSection>
          <Filters />
        </FilterSection>
        <ContentArea>
          <FullWidthStickyContainer>
            <StatsContainer>
              <Finished stats={stats} />
              <Omgjort stats={stats} />
            </StatsContainer>
          </FullWidthStickyContainer>

          <DynamicCard size={CardSize.MEDIUM}>
            <CardTitle>Utfall</CardTitle>
            <StyledCharts>
              <UtfallGraph stats={stats} />
            </StyledCharts>
          </DynamicCard>

          <DynamicCard size={CardSize.MEDIUM}>
            <CardTitle>Hjemler</CardTitle>
            <StyledCharts>
              <Hjemler stats={stats} />
            </StyledCharts>
          </DynamicCard>

          <DynamicCard size={CardSize.LARGE}>
            <CardTitle>Kvalitetsvurderinger</CardTitle>
            <ToggleKvalitetsvurdering />
            <StyledCharts>
              <Kvalitetsvurderinger stats={stats} />
            </StyledCharts>
          </DynamicCard>

          <DynamicCard size={CardSize.LARGE}>
            <Table data={saksdata} testId="fullfoerte-registreringer" />
          </DynamicCard>
        </ContentArea>
      </FiltersAndContentContainer>
    </>
  );
};
