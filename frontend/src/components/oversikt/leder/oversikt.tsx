import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { CardSize, DynamicCard } from '../card/card';
import { BehandlingstidHistogram } from '../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../charts/behandlingstid-over-time';
import { Hjemler } from '../charts/hjemler';
import { Kvalitetsvurderinger } from '../charts/kvalitetsvurderinger';
import { UtfallGraph } from '../charts/utfall-graph';
import { Gjennomsnittstid } from '../key-stats/average-time';
import { Finished } from '../key-stats/finished';
import { Omgjort } from '../key-stats/omgjort';
import { Processed } from '../key-stats/processed';
import {
  CardTitle,
  ContentArea,
  FilterSection,
  FiltersAndContentContainer,
  FullWidthStickyContainer,
  Overlay,
  StatsContainer,
  StyledCharts,
} from '../styled-components';
import { ToggleTotalOrKA } from '../toggle-ka-total';
import { ToggleKvalitetsvurdering } from '../toggle-kvalitetsvurdering';
import { Filters } from './filters';
import { useFilteredManagerStatistics, useManagerStatisticsIsLoading } from './hooks/use-statistics';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

export const Oversikt = () => {
  const stats = useFilteredManagerStatistics();

  return (
    <>
      <LoadingOverlay />
      <FiltersAndContentContainer>
        <FilterSection>
          <Filters />
        </FilterSection>
        <ContentArea>
          <FullWidthStickyContainer>
            <StatsContainer>
              <Finished stats={stats} />
              <Omgjort stats={stats} />
              <Gjennomsnittstid stats={stats} />
              <Processed weeks={12} stats={stats} />
              <Processed weeks={15} stats={stats} />
            </StatsContainer>
          </FullWidthStickyContainer>

          <DynamicCard size={CardSize.LARGE}>
            <CardTitle>Behandlingstid</CardTitle>
            <ToggleTotalOrKA />
            <StyledCharts>
              <BehandlingstidHistogram stats={stats} />
            </StyledCharts>
          </DynamicCard>

          <BehandlingstidOverTime stats={stats} />

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
        </ContentArea>
      </FiltersAndContentContainer>
    </>
  );
};

const LoadingOverlay = () => {
  const isLoading = useManagerStatisticsIsLoading();

  if (isLoading) {
    return (
      <Overlay>
        <NavFrontendSpinner type="XXL" />
      </Overlay>
    );
  }

  return null;
};
