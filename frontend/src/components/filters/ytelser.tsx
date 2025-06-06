import { Filter } from '@app/components/filters/common/filter';
import { QueryParams } from '@app/components/filters/filter-query-params';
import type { IYtelse } from '@app/types/kodeverk';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { FilterType } from './types';

interface YtelseFilterProps {
  selected: string[];
  ytelser: IYtelse[];
}

export const YtelseFilter = ({ ytelser, selected }: YtelseFilterProps) => {
  const filters = useMemo<FilterType[]>(() => ytelser.map(({ id, navn }) => ({ label: navn, id })), [ytelser]);
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (selectedYtelser: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (selectedYtelser.length === 0) {
      params.delete(QueryParams.YTELSER);
    } else {
      params.set(QueryParams.YTELSER, selectedYtelser.join(','));
    }

    params.delete(QueryParams.HJEMLER);

    setSearchParams(params);
  };

  return <Filter label="Ytelse" filters={filters} selected={selected} setSelected={onChange} />;
};
