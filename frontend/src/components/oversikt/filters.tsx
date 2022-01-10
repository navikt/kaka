import Knapp from 'nav-frontend-knapper';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { ExcelExport } from '../excel-export/excel-export';
import { EnheterFilter } from './filters/enheter';
import { SakstypeFilter } from './filters/types';
import { YearFilter } from './filters/year';
import { YtelseFilter } from './filters/ytelser';
import { QueryParams } from './types';

export const Filters = () => {
  const { data: userData } = useGetUserDataQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedEnheter = searchParams.get(QueryParams.ENHETER)?.split(',') ?? [];
  const selectedTypes = searchParams.get(QueryParams.TYPES)?.split(',') ?? [];
  const selectedYtelser = searchParams.get(QueryParams.YTELSER)?.split(',') ?? [];
  const queryYear = searchParams.get(QueryParams.YEAR);
  const selectedYear = typeof queryYear === 'string' ? Number.parseInt(queryYear, 10) : new Date().getFullYear();

  const setFilter = (filter: QueryParams, values: (string | number)[]) => {
    if (values.length === 0) {
      searchParams.delete(filter);
    } else {
      searchParams.set(filter, values.join(','));
    }

    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    const query = userData?.klageenheter.map(({ id }) => id).join(',');

    if (typeof query === 'string') {
      setSearchParams(`?${QueryParams.ENHETER}=${query}`);
    } else {
      setSearchParams('');
    }
  };

  return (
    <Container>
      <StyledResetButton onClick={resetFilters} mini kompakt>
        Nullstill filter
      </StyledResetButton>
      <YearFilter selectedYear={selectedYear} setSelectedYear={(year) => setFilter(QueryParams.YEAR, [year])} />
      <EnheterFilter
        selectedEnheter={selectedEnheter}
        setSelectedEnheter={(values) => setFilter(QueryParams.ENHETER, values)}
      />
      <SakstypeFilter
        selectedTypes={selectedTypes}
        setSelectedTypes={(values) => setFilter(QueryParams.TYPES, values)}
      />
      <YtelseFilter
        selectedYtelser={selectedYtelser}
        setSelectedYtelser={(values) => setFilter(QueryParams.YTELSER, values)}
      />
      <ExcelExport />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledResetButton = styled(Knapp)`
  margin-bottom: 1em;
`;
