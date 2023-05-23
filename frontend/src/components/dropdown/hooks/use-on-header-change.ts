import { useCallback } from 'react';
import { Option, OptionGroup } from '@app/components/dropdown/types';

export const useOnHeaderChange = (options: OptionGroup[], setFilteredGroups: (g: OptionGroup[]) => void) =>
  useCallback(
    (filteredOptions: Option[]) =>
      setFilteredGroups(
        options
          .map(({ sectionOptions, ...rest }) => ({
            ...rest,
            sectionOptions: sectionOptions.filter((o) => filteredOptions.includes(o)),
          }))
          .filter(({ sectionOptions }) => sectionOptions.length !== 0)
      ),
    [options, setFilteredGroups]
  );
