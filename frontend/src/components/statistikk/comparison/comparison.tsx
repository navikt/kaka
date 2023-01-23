import React from 'react';
import { FilterSection, FiltersAndContentContainer } from '../../../styled-components/filters-and-content';
import { useVersionQueryFilter } from '../../filters/hooks/use-query-filter';
import { ContentLoader } from '../content-loader';
import { ContentV1 } from './content/content-v1';
import { ContentV2 } from './content/content-v2';
import { Filters } from './filters';
import { useComparisonV1IsLoading, useFilteredStatisticsV1 } from './hooks/use-statistics-v1';
import { useComparisonV2IsLoading, useFilteredStatisticsV2 } from './hooks/use-statistics-v2';

export const Comparison = () => {
  const version = useVersionQueryFilter();

  return (
    <>
      <FiltersAndContentContainer>
        <FilterSection>
          <Filters />
        </FilterSection>
        <ContentLoader version={version} V1Content={<V1Content />} V2Content={<V2Content />} />
      </FiltersAndContentContainer>
    </>
  );
};

const V1Content = () => <ContentV1 stats={useFilteredStatisticsV1()} isLoading={useComparisonV1IsLoading()} />;
const V2Content = () => <ContentV2 stats={useFilteredStatisticsV2()} isLoading={useComparisonV2IsLoading()} />;
