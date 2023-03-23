import React from 'react';
import { FilterSection, FiltersAndContentContainer } from '@app/styled-components/filters-and-content';
import { useVersionQueryFilter } from '../filters/hooks/use-query-filter';
import { ContentLoader } from '../statistikk/content-loader';
import { ContentV1 } from './content/content-v1';
import { ContentV2 } from './content/content-v2';
import { Filters } from './filters';
import { useFilteredSaksdataV1, useSaksdataV1IsLoading } from './hooks/use-filtered-saksdata-v1';
import { useFilteredSaksdataV2, useSaksdataV2IsLoading } from './hooks/use-filtered-saksdata-v2';
import { useFilteredStatisticsV1, useTilbakemeldingerStatisticsV1IsLoading } from './hooks/use-filtered-statistics-v1';
import { useFilteredStatisticsV2, useTilbakemeldingerStatisticsV2IsLoading } from './hooks/use-filtered-statistics-v2';

export const Tilbakemeldinger = () => {
  const version = useVersionQueryFilter();

  return (
    <FiltersAndContentContainer>
      <FilterSection>
        <Filters />
      </FilterSection>

      <ContentLoader version={version} V1Content={<V1Content />} V2Content={<V2Content />} />
    </FiltersAndContentContainer>
  );
};

const V1Content = () => (
  <ContentV1
    {...useFilteredStatisticsV1()}
    statsIsLoading={useTilbakemeldingerStatisticsV1IsLoading()}
    saksdata={useFilteredSaksdataV1()}
    saksdataIsLoading={useSaksdataV1IsLoading()}
  />
);
const V2Content = () => (
  <ContentV2
    {...useFilteredStatisticsV2()}
    statsIsLoading={useTilbakemeldingerStatisticsV2IsLoading()}
    saksdata={useFilteredSaksdataV2()}
    saksdataIsLoading={useSaksdataV2IsLoading()}
  />
);
