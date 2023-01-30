import React from 'react';
import { FilterSection, FiltersAndContentContainer } from '../../../styled-components/filters-and-content';
import { useVersionQueryFilter } from '../../filters/hooks/use-query-filter';
import { ContentLoader } from '../content-loader';
import { ContentV1 } from './content/content-v1';
import { ContentV2 } from './content/content-v2';
import { Filters } from './filters';
import { useFilteredMyStatisticsV1, useMyStatisticsV1IsLoading } from './hooks/use-statistics-v1';
import { useFilteredMyStatisticsV2, useMyStatisticsV2IsLoading } from './hooks/use-statistics-v2';

export const MinStatistikk = () => {
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

const V1Content = () => <ContentV1 {...useFilteredMyStatisticsV1()} isLoading={useMyStatisticsV1IsLoading()} />;
const V2Content = () => <ContentV2 {...useFilteredMyStatisticsV2()} isLoading={useMyStatisticsV2IsLoading()} />;
