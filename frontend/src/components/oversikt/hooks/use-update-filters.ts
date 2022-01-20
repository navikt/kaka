import { useCallback } from 'react';

type UpdateFilterType = (id: string, checked: boolean) => void;
type SetSelectedType = (idList: string[]) => void;

export const useUpdateFilters = (selected: string[], setSelected: SetSelectedType): UpdateFilterType =>
  useCallback(
    (id: string, checked: boolean) => {
      const newList = checked ? [...selected, id] : selected.filter((s) => s !== id);
      setSelected(newList);
    },
    [setSelected, selected]
  );
