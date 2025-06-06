import { Filter } from '@app/components/filters/common/filter';
import { QueryParams } from '@app/components/filters/filter-query-params';
import { useQueryFilters, useVersionQueryFilter } from '@app/components/filters/hooks/use-query-filter';
import { useYtelser } from '@app/simple-api-state/use-kodeverk';
import type { IYtelse } from '@app/types/kodeverk';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FilterType } from './types';

interface YtelseFilterProps {
  selected: string[];
  ytelser: IYtelse[];
}

export const YtelseFilter = ({ ytelser, selected }: YtelseFilterProps) => {
  const filters = useMemo<FilterType[]>(() => ytelser.map(({ id, navn }) => ({ label: navn, id })), [ytelser]);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const version = useVersionQueryFilter();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: allYtelser = [] } = useYtelser(version);

  const getFilteredHjemler = useCallback(
    (selected: string[]) => {
      if (selectedHjemler.length === 0) {
        return [];
      }

      const filteredYtelser = selected.length === 0 ? allYtelser : allYtelser.filter(({ id }) => selected.includes(id));
      const hjemler: string[] = [];

      for (const { lovKildeToRegistreringshjemler } of filteredYtelser) {
        for (const { registreringshjemler } of lovKildeToRegistreringshjemler) {
          for (const { id } of registreringshjemler) {
            if (!hjemler.includes(id)) {
              hjemler.push(id);
            }
          }
        }
      }

      return selectedHjemler.filter((hjemmel) => hjemler.includes(hjemmel));
    },
    [allYtelser, selectedHjemler],
  );

  const onChange = (selectedYtelser: string[]) => {
    if (selectedYtelser.length === 0) {
      searchParams.delete(QueryParams.YTELSER);
    } else {
      searchParams.set(QueryParams.YTELSER, selectedYtelser.join(','));
    }

    const filteredHjemler = getFilteredHjemler(selectedYtelser);

    if (filteredHjemler.length === 0) {
      searchParams.delete(QueryParams.HJEMLER);
    } else {
      searchParams.set(QueryParams.HJEMLER, filteredHjemler.join(','));
    }

    setSearchParams(searchParams);
  };

  return <Filter label="Ytelse" filters={filters} selected={selected} setSelected={onChange} />;
};
