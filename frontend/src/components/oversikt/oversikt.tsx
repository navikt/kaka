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
import { CardSize, DynamicCard } from './card/card';
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
  CardTitle,
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

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Behandlingstid</CardTitle>
          <ToggleTotalOrKA />
          <StyledCharts>
            <RegistreringTimeDistribution />
          </StyledCharts>
        </DynamicCard>

        <BehandlingstidOverTime />

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <StyledCharts>
            <UtfallGraph />
          </StyledCharts>
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <StyledCharts>
            <Hjemler />
          </StyledCharts>
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <ToggleKvalitetsvurdering />
          <StyledCharts>
            <Kvalitetsvurderinger />
          </StyledCharts>
        </DynamicCard>
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
