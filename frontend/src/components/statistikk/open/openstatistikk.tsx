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
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import React from 'react';
import styled from 'styled-components';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../../styled-components/cards';
import { ContentArea, FilterSection, FiltersAndContentContainer } from '../../../styled-components/filters-and-content';
import { LoadingOverlay } from '../../loader/overlay';
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
import { StyledCharts } from '../styled-components';
import { ToggleTotalOrKA } from '../toggle-ka-total';
import { ToggleKvalitetsvurdering } from '../toggle-kvalitetsvurdering';
import { Filters } from './filters';
import { useFilteredStatistics, useTotalStatisticsIsLoading } from './hooks/use-statistics';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

export const OpenStatistikk = () => {
  const stats = useFilteredStatistics();

  return (
    <>
      <LoadingOverlay isLoading={useTotalStatisticsIsLoading()} />
      <FiltersAndContentContainer>
        <FilterSection>
          <Disclaimer>
            Denne statistikken baserer seg på resultater av klage- og ankebehandlinger som er fullført i NAV
            Klageinstans. Statistikken kan derfor avvike fra offisiell statistikk på området.
          </Disclaimer>
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
            <CardTitle>Kvalitetsvurderinger</CardTitle>
            <ToggleKvalitetsvurdering />
            <StyledCharts>
              <Kvalitetsvurderinger stats={stats} />
            </StyledCharts>
          </DynamicCard>

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
            <CardTitle>Behandlingstid</CardTitle>
            <ToggleTotalOrKA />
            <StyledCharts>
              <BehandlingstidHistogram stats={stats} />
            </StyledCharts>
          </DynamicCard>

          <BehandlingstidOverTime stats={stats} />
        </ContentArea>
      </FiltersAndContentContainer>
    </>
  );
};

const Disclaimer = styled(AlertStripeInfo)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
`;
