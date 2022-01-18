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
import { useStatistics } from '../../hooks/use-statistics';
import { BehandlingstidOverTime } from './charts/behandlingstid-over-time';
import { Kvalitetsvurderinger } from './charts/kvalitetsvurderinger';
import { RegistreringTimeDistribution } from './charts/registrering-time-distribution';
import { UtfallGraph } from './charts/utfall-graph';
import { Filters } from './filters';
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
  KeyStatsArea,
  Overlay,
  StyledCharts,
} from './styled-components';
import { ToggleTotalOrKA } from './toggle-ka-total';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

export const Oversikt = () => (
  <>
    <LoadingOverlay />
    <FiltersAndContentContainer>
      <FilterSection>
        <Filters />
      </FilterSection>
      <ContentArea>
        <ChartSectionRow>
          <ChartSectionTitle>Utfall</ChartSectionTitle>
          <KeyStatsArea>
            <Finished />
            <Omgjort />
          </KeyStatsArea>
          <StyledCharts>
            <UtfallGraph />
          </StyledCharts>
        </ChartSectionRow>
        <ChartSectionRow>
          <ChartSectionTitle>Behandlingstid</ChartSectionTitle>
          <ToggleTotalOrKA />
          <KeyStatsArea>
            <Finished />
            <Gjennomsnittstid />
            <Processed weeks={12} />
            <Processed weeks={15} />
          </KeyStatsArea>
          <StyledCharts>
            <RegistreringTimeDistribution />
          </StyledCharts>
        </ChartSectionRow>
        <ChartSectionRow>
          <ChartSectionTitle>Behandlingstid over tid</ChartSectionTitle>
          <StyledCharts>
            <BehandlingstidOverTime />
          </StyledCharts>
        </ChartSectionRow>
        <ChartSectionRow>
          <ChartSectionTitle>Kvalitetsvurderinger</ChartSectionTitle>
          <KeyStatsArea>
            <Finished />
          </KeyStatsArea>
          <StyledCharts>
            <Kvalitetsvurderinger />
          </StyledCharts>
        </ChartSectionRow>
      </ContentArea>
    </FiltersAndContentContainer>
  </>
);

const LoadingOverlay = () => {
  const { isLoading } = useStatistics();

  if (isLoading) {
    return (
      <Overlay>
        <NavFrontendSpinner type="XXL" />
      </Overlay>
    );
  }

  return null;
};
