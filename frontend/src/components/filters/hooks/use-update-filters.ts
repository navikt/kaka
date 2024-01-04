import { useCallback } from 'react';

type UpdateFilterType = (id: string, checked: boolean) => void;
type SetSelectedType = (idList: string[]) => void;

export const useUpdateFilters = <T extends string | number>(
  selected: T[],
  setSelected: SetSelectedType,
): UpdateFilterType =>
  useCallback(
    (id: string, checked: boolean) => {
      const newList = checked ? [...selected, id] : selected.filter((s) => s.toString(10) !== id);
      setSelected(newList.map((s) => s.toString(10)));
    },
    [setSelected, selected],
  );
