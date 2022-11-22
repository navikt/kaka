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
import React from 'react';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../../styled-components/cards';
import { ContentArea, FilterSection, FiltersAndContentContainer } from '../../../styled-components/filters-and-content';
import { LoadingOverlay } from '../../loader/overlay';
import { CardSize, DynamicCard } from '../card/card';
import { BehandlingstidHistogram } from '../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../charts/behandlingstid-over-time';
import { Hjemler } from '../charts/hjemler';
import { Kvalitetsvurderinger } from '../charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { UtfallGraph } from '../charts/utfall-graph';
import { Gjennomsnittstid } from '../key-stats/average-time';
import { Finished } from '../key-stats/finished';
import { Omgjort } from '../key-stats/omgjort';
import { Processed } from '../key-stats/processed';
import { ToggleTotalOrKA } from '../toggle-ka-total';
import { ToggleKvalitetsvurdering } from '../toggle-kvalitetsvurdering';
import { Filters } from './filters';
import { useFilteredManagerStatistics, useManagerStatisticsIsLoading } from './hooks/use-statistics';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

export const Lederstatistikk = () => {
  const stats = useFilteredManagerStatistics();

  return (
    <>
      <LoadingOverlay isLoading={useManagerStatisticsIsLoading()} />
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
            <CardTitle>Kvalitetsvurderinger</CardTitle>
            <ToggleKvalitetsvurdering />
            <Kvalitetsvurderinger stats={stats} />
          </DynamicCard>

          <DynamicCard size={CardSize.MEDIUM}>
            <CardTitle>Utfall</CardTitle>
            <UtfallGraph stats={stats} />
          </DynamicCard>

          <DynamicCard size={CardSize.MEDIUM}>
            <CardTitle>Hjemler</CardTitle>
            <Hjemler stats={stats} />
          </DynamicCard>

          <DynamicCard size={CardSize.LARGE}>
            <CardTitle>Behandlingstid</CardTitle>
            <ToggleTotalOrKA />
            <BehandlingstidHistogram stats={stats} />
          </DynamicCard>

          <BehandlingstidOverTime stats={stats} />
        </ContentArea>
      </FiltersAndContentContainer>
    </>
  );
};
