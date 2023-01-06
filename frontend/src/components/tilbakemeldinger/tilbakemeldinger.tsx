import React from 'react';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../styled-components/cards';
import { ContentArea, FilterSection, FiltersAndContentContainer } from '../../styled-components/filters-and-content';
import { KvalitetsvurderingVersion } from '../../types/saksdata';
import { IStatisticVurderingV1 } from '../../types/statistics/v1';
import { IStatisticVurderingV2 } from '../../types/statistics/v2';
import { VersionWarning } from '../filters/common/version-warning';
import { useVersionQueryFilter } from '../filters/hooks/use-query-filter';
import { VurderingerTable } from '../kvalitetsvurderinger/table';
import { LoadingOverlay } from '../loader/overlay';
import { CardSize, DynamicCard } from '../statistikk/card/card';
import { Hjemler } from '../statistikk/charts/hjemler';
import { KvalitetsvurderingerV1 } from '../statistikk/charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { UtfallGraph } from '../statistikk/charts/utfall-graph';
import { KvalitetsvurderingerV2 } from '../statistikk/charts/v2/kvalitetsvurderinger';
import { ContentLoader } from '../statistikk/content-loader';
import { Finished } from '../statistikk/key-stats/finished';
import { Omgjort } from '../statistikk/key-stats/omgjort';
import { Filters } from './filters';
import { useFilteredSaksdata, useSaksdataIsLoading } from './hooks/use-filtered-saksdata';
import { useFilteredStatisticsV1, useTilbakemeldingerStatisticsV1IsLoading } from './hooks/use-filtered-statistics-v1';
import { useFilteredStatisticsV2, useTilbakemeldingerStatisticsV2IsLoading } from './hooks/use-filtered-statistics-v2';

export const Tilbakemeldinger = () => {
  const version = useVersionQueryFilter();

  return (
    <FiltersAndContentContainer>
      <FilterSection>
        <VersionWarning />
        <Filters />
      </FilterSection>

      <ContentLoader version={version} V1Content={<V1Content />} V2Content={<V2Content />} />
    </FiltersAndContentContainer>
  );
};

const { V1, V2 } = KvalitetsvurderingVersion;

const V1Content = () => (
  <Content stats={useFilteredStatisticsV1()} version={V1} isLoading={useTilbakemeldingerStatisticsV1IsLoading()} />
);
const V2Content = () => (
  <Content stats={useFilteredStatisticsV2()} version={V2} isLoading={useTilbakemeldingerStatisticsV2IsLoading()} />
);

interface ContentV1Props {
  stats: IStatisticVurderingV1[];
  version: KvalitetsvurderingVersion.V1;
  isLoading: boolean;
}

interface ContentV2Props {
  stats: IStatisticVurderingV2[];
  version: KvalitetsvurderingVersion.V2;
  isLoading: boolean;
}

type ContentProps = ContentV1Props | ContentV2Props;

const Content = ({ stats, version, isLoading }: ContentProps) => {
  const saksdata = useFilteredSaksdata();

  const saksdataIsLoading = useSaksdataIsLoading();

  return (
    <>
      <LoadingOverlay isLoading={saksdataIsLoading || isLoading} />

      <ContentArea>
        <FullWidthStickyContainer>
          <StatsContainer>
            <Finished stats={stats} />
            <Omgjort stats={stats} />
          </StatsContainer>
        </FullWidthStickyContainer>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          {version === V1 ? <KvalitetsvurderingerV1 stats={stats} /> : null}
          {version === V2 ? <KvalitetsvurderingerV2 /> : null}
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <VurderingerTable data={saksdata} testId="fullfoerte-vurderinger" />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <UtfallGraph stats={stats} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <Hjemler stats={stats} />
        </DynamicCard>
      </ContentArea>
    </>
  );
};
