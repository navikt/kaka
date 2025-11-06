import {
  useFilteredTotalStatisticsV3,
  useTotalStatisticsV3IsLoading,
} from '@app/components/statistikk/total/hooks/use-statistics-v3';
import { FilterSection, FiltersAndContentContainer } from '@app/styled-components/filters-and-content';
import { useVersionQueryFilter } from '../../filters/hooks/use-query-filter';
import { ContentLoader } from '../content-loader';
import { ContentV1 } from './content/content-v1';
import { ContentV2 } from './content/content-v2';
import { ContentV3 } from './content/content-v3';
import { Filters } from './filters';
import { useFilteredTotalStatisticsV1, useTotalStatisticsV1IsLoading } from './hooks/use-statistics-v1';
import { useFilteredTotalStatisticsV2, useTotalStatisticsV2IsLoading } from './hooks/use-statistics-v2';

export const TotalStatistikk = () => {
  const version = useVersionQueryFilter();

  return (
    <>
      <FiltersAndContentContainer>
        <FilterSection>
          <Filters />
        </FilterSection>

        <ContentLoader
          version={version}
          V1Content={<V1Content />}
          V2Content={<V2Content />}
          V3Content={<V3Content />}
        />
      </FiltersAndContentContainer>
    </>
  );
};

const V1Content = () => <ContentV1 rest={useFilteredTotalStatisticsV1()} isLoading={useTotalStatisticsV1IsLoading()} />;
const V2Content = () => <ContentV2 rest={useFilteredTotalStatisticsV2()} isLoading={useTotalStatisticsV2IsLoading()} />;
const V3Content = () => <ContentV3 rest={useFilteredTotalStatisticsV3()} isLoading={useTotalStatisticsV3IsLoading()} />;
