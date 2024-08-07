import { FilterSection, FiltersAndContentContainer } from '@app/styled-components/filters-and-content';
import { useVersionQueryFilter } from '../../filters/hooks/use-query-filter';
import { ContentLoader } from '../content-loader';
import { ContentV1 } from './content/content-v1';
import { ContentV2 } from './content/content-v2';
import { Filters } from './filters';
import { useFilteredManagerStatisticsV1, useManagerStatisticsV1IsLoading } from './hooks/use-statistics-v1';
import { useFilteredManagerStatisticsV2, useManagerStatisticsV2IsLoading } from './hooks/use-statistics-v2';

export const Lederstatistikk = () => {
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

const V1Content = () => (
  <ContentV1 {...useFilteredManagerStatisticsV1()} isLoading={useManagerStatisticsV1IsLoading()} />
);
const V2Content = () => (
  <ContentV2 {...useFilteredManagerStatisticsV2()} isLoading={useManagerStatisticsV2IsLoading()} />
);
