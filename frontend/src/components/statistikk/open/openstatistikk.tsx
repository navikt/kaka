import { Alert } from '@navikt/ds-react';
import React from 'react';
import { FilterSection, FiltersAndContentContainer } from '../../../styled-components/filters-and-content';
import { useVersionQueryFilter } from '../../filters/hooks/use-query-filter';
import { ContentLoader } from '../content-loader';
import { ContentV1 } from './content/content-v1';
import { ContentV2 } from './content/content-v2';
import { Filters } from './filters';
import { useFilteredStatisticsV1, useOpenStatisticsV1IsLoading } from './hooks/use-statistics-v1';
import { useFilteredStatisticsV2, useOpenStatisticsV2IsLoading } from './hooks/use-statistics-v2';

export const OpenStatistikk = () => {
  const version = useVersionQueryFilter();

  return (
    <FiltersAndContentContainer>
      <FilterSection>
        <Alert variant="info" size="medium" fullWidth>
          Denne statistikken baserer seg på resultater av klage- og ankebehandlinger som er fullført i NAV Klageinstans.
          Statistikken kan derfor avvike fra offisiell statistikk på området.
        </Alert>
        <Filters />
      </FilterSection>
      <ContentLoader version={version} V1Content={<V1Content />} V2Content={<V2Content />} />
    </FiltersAndContentContainer>
  );
};

const V1Content = () => <ContentV1 stats={useFilteredStatisticsV1()} isLoading={useOpenStatisticsV1IsLoading()} />;
const V2Content = () => <ContentV2 stats={useFilteredStatisticsV2()} isLoading={useOpenStatisticsV2IsLoading()} />;
