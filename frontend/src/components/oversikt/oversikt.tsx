import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import { useStatistics } from '../../hooks/use-statistics';
import { Kvalitetsvurderinger } from './charts/kvalitetsvurderinger';
import { RegistreringTimeDistribution } from './charts/registrering-time-distribution';
import { UtfallGraph } from './charts/utfall-graph';
import { Filters } from './filters';
import { Gjennomsnittstid } from './key-stats/average-time';
import { Finished } from './key-stats/finished';
import { Omgjort } from './key-stats/omgjort';
import { Processed } from './key-stats/processed';
import {
  ChartSectionTitle,
  ContentArea,
  FilterSection,
  FiltersAndContentContainer,
  KeyStatsArea,
  Overlay,
  StyledCharts,
} from './styled-components';
import { ToggleTotalOrKA } from './toggle-ka-total';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export const Oversikt = () => (
  <>
    <LoadingOverlay />
    <FiltersAndContentContainer>
      <FilterSection>
        <Filters />
      </FilterSection>
      <ContentArea>
        <section>
          <ChartSectionTitle>Utfall</ChartSectionTitle>
          <KeyStatsArea>
            <Finished />
            <Omgjort />
          </KeyStatsArea>
          <StyledCharts>
            <UtfallGraph />
          </StyledCharts>
        </section>
        <section>
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
        </section>
        <section>
          <ChartSectionTitle>Kvalitetsvurderinger</ChartSectionTitle>
          <KeyStatsArea>
            <Finished />
          </KeyStatsArea>
          <StyledCharts>
            <Kvalitetsvurderinger />
          </StyledCharts>
        </section>
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
