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
import { KvalitetsvurderingVersion } from '../../../types/saksdata';
import { IFullStatisticVurderingV1 } from '../../../types/statistics/v1';
import { IFullStatisticVurderingV2 } from '../../../types/statistics/v2';
import { VersionWarning } from '../../filters/common/version-warning';
import { useVersionQueryFilter } from '../../filters/hooks/use-query-filter';
import { LoadingOverlay } from '../../loader/overlay';
import { CardSize, DynamicCard } from '../card/card';
import { BehandlingstidHistogram } from '../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../charts/behandlingstid-over-time';
import { Hjemler } from '../charts/hjemler';
import { KvalitetsvurderingerV1 } from '../charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { UtfallGraph } from '../charts/utfall-graph';
import { KvalitetsvurderingerV2 } from '../charts/v2/kvalitetsvurderinger';
import { ContentLoader } from '../content-loader';
import { Gjennomsnittstid } from '../key-stats/average-time';
import { Finished } from '../key-stats/finished';
import { Omgjort } from '../key-stats/omgjort';
import { Processed } from '../key-stats/processed';
import { ToggleTotalOrKA } from '../toggle-ka-total';
import { ToggleKvalitetsvurdering } from '../toggle-kvalitetsvurdering';
import { Filters } from './filters';
import { useFilteredManagerStatisticsV1, useManagerStatisticsV1IsLoading } from './hooks/use-statistics-v1';
import { useFilteredManagerStatisticsV2, useManagerStatisticsV2IsLoading } from './hooks/use-statistics-v2';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

export const Lederstatistikk = () => {
  const version = useVersionQueryFilter();

  return (
    <>
      <FiltersAndContentContainer>
        <FilterSection>
          <VersionWarning />
          <Filters />
        </FilterSection>
        <ContentLoader version={version} V1Content={<V1Content />} V2Content={<V2Content />} />
      </FiltersAndContentContainer>
    </>
  );
};

const { V1, V2 } = KvalitetsvurderingVersion;

const V1Content = () => (
  <Content stats={useFilteredManagerStatisticsV1()} version={V1} isLoading={useManagerStatisticsV1IsLoading()} />
);
const V2Content = () => (
  <Content stats={useFilteredManagerStatisticsV2()} version={V2} isLoading={useManagerStatisticsV2IsLoading()} />
);

interface ContentV1Props {
  stats: IFullStatisticVurderingV1[];
  version: KvalitetsvurderingVersion.V1;
  isLoading: boolean;
}

interface ContentV2Props {
  stats: IFullStatisticVurderingV2[];
  version: KvalitetsvurderingVersion.V2;
  isLoading: boolean;
}

type ContentProps = ContentV1Props | ContentV2Props;

const Content = ({ stats, version, isLoading }: ContentProps) => (
  <>
    <LoadingOverlay isLoading={isLoading} />

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
        {version === V1 ? <KvalitetsvurderingerV1 stats={stats} /> : null}
        {version === V2 ? <KvalitetsvurderingerV2 /> : null}
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
  </>
);
