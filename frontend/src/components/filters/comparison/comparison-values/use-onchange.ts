import { useSearchParams } from 'react-router-dom';
import { OptionValue } from '@app/types/statistics/common';
import { getDefaultColor } from '../../../statistikk/comparison/get-default-color';
import { QueryParams } from '../../filter-query-params';
import { useComparisonValues } from './use-values';

interface OnChange {
  add: (id: string) => void;
  remove: (id: string) => void;
  removeIndex: (index: number) => void;
  setId: (id: string, newId: string) => void;
  setIdByIndex: (index: number, newId: string) => void;
  setColor: (id: string, newColor: string) => void;
  selectedValues: OptionValue[];
}

export const useOnchange = (): OnChange => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValues = useComparisonValues();

  const setQueryParams = (newValues: OptionValue[]) => {
    searchParams.set(QueryParams.COMPARISON_VALUES, JSON.stringify(newValues));
    setSearchParams(searchParams, { replace: true });
  };

  const add = (id: string) => setQueryParams([...selectedValues, [id, getDefaultColor(selectedValues)]]);

  const setValues = (newValues: OptionValue[]) => {
    if (newValues.length === 0) {
      searchParams.delete(QueryParams.COMPARISON_VALUES);
    } else {
      searchParams.set(QueryParams.COMPARISON_VALUES, JSON.stringify(newValues));
    }

    setSearchParams(searchParams, { replace: true });
  };

  const remove = (id: string) => setValues(selectedValues.filter(([e]) => e !== id));
  const removeIndex = (index: number) => setValues(selectedValues.filter((_, i) => i !== index));

  const setColor = (id: string, newColor: string) =>
    setQueryParams(selectedValues.map<OptionValue>(([e, c]) => (e === id ? [e, newColor] : [e, c])));

  const setId = (id: string, newId: string) =>
    setQueryParams(selectedValues.map<OptionValue>(([e, c]) => (e === id ? [newId, c] : [e, c])));
  const setIdByIndex = (index: number, newId: string) =>
    setQueryParams(selectedValues.map<OptionValue>(([e, c], i) => (i === index ? [newId, c] : [e, c])));

  return { add, remove, removeIndex, setColor, setId, setIdByIndex, selectedValues };
};
