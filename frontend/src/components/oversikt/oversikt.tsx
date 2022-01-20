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
import { BehandlingstidOverTime } from './charts/behandlingstid-over-time';
import { Hjemler } from './charts/hjemler';
import { Kvalitetsvurderinger } from './charts/kvalitetsvurderinger';
import { RegistreringTimeDistribution } from './charts/registrering-time-distribution';
import { UtfallGraph } from './charts/utfall-graph';
import { Filters } from './filters';
import { useStatisticsIsLoading } from './hooks/use-statistics';
import { Gjennomsnittstid } from './key-stats/average-time';
import { Finished } from './key-stats/finished';
import { Omgjort } from './key-stats/omgjort';
import { Processed } from './key-stats/processed';
import {
  ChartSectionRow,
  ChartSectionTitle,
  ContentArea,
  FilterSection,
  FiltersAndContentContainer,
  Overlay,
  StickyStats,
  StyledCharts,
} from './styled-components';
import { ToggleTotalOrKA } from './toggle-ka-total';
import { ToggleKvalitetsvurdering } from './toggle-kvalitetsvurdering';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

export const Oversikt = () => (
  <>
    <LoadingOverlay />
    <FiltersAndContentContainer>
      <FilterSection>
        <Filters />
      </FilterSection>
      <ContentArea>
        <StickyStats>
          <Finished />
          <Omgjort />
          <Gjennomsnittstid />
          <Processed weeks={12} />
          <Processed weeks={15} />
        </StickyStats>
        <ChartSectionRow>
          <ChartSectionTitle>Utfall</ChartSectionTitle>
          <StyledCharts>
            <UtfallGraph />
          </StyledCharts>
        </ChartSectionRow>
        <ChartSectionRow>
          <ChartSectionTitle>Hjemler</ChartSectionTitle>
          <StyledCharts>
            <Hjemler />
          </StyledCharts>
        </ChartSectionRow>
        <ChartSectionRow>
          <ChartSectionTitle>Behandlingstid</ChartSectionTitle>
          <ToggleTotalOrKA />
          <StyledCharts>
            <RegistreringTimeDistribution />
            <BehandlingstidOverTime />
          </StyledCharts>
        </ChartSectionRow>
        <ChartSectionRow>
          <ChartSectionTitle>Kvalitetsvurderinger</ChartSectionTitle>
          <ToggleKvalitetsvurdering />
          <StyledCharts>
            <Kvalitetsvurderinger />
          </StyledCharts>
        </ChartSectionRow>
      </ContentArea>
    </FiltersAndContentContainer>
  </>
);

const LoadingOverlay = () => {
  const isLoading = useStatisticsIsLoading();

  if (isLoading) {
    return (
      <Overlay>
        <NavFrontendSpinner type="XXL" />
      </Overlay>
    );
  }

  return null;
};
