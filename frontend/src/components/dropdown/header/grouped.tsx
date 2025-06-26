import { type BaseProps, InternalHeader, getFilters } from '@app/components/dropdown/header/common';
import type { OptionGroup } from '@app/components/dropdown/types';
import { useCallback } from 'react';

interface GroupedHeaderProps extends BaseProps {
  options: OptionGroup[];
  onChange: (filtered: OptionGroup[]) => void;
}

export const GroupedHeader = ({ options, onChange, ...props }: GroupedHeaderProps) => {
  const onInputChange = useCallback(
    (search: string) => {
      if (search.length === 0) {
        return onChange(options);
      }

      const [fuzzy, simple] = getFilters(search);

      onChange(groupedFilterOptions(options, fuzzy, simple));
    },
    [onChange, options],
  );

  return <InternalHeader {...props} onChange={onInputChange} />;
};

const groupedFilterOptions = (
  options: OptionGroup[],
  fuzzyFilter: RegExp | null,
  simpleFilter: RegExp | null,
): OptionGroup[] => {
  if (fuzzyFilter === null || simpleFilter === null) {
    return options;
  }

  const filtered: OptionGroup[] = [];

  for (const option of options) {
    if (option.sectionHeader === undefined) {
      const sectionOptions = filterSectionOptions(option, simpleFilter, fuzzyFilter);

      if (sectionOptions.length > 0) {
        filtered.push({ ...option, sectionOptions });

        continue;
      }
    }

    const simpleHeaderMatch = simpleFilter.test(option.sectionHeader.name ?? '');
    const fuzzyHeaderMatch = fuzzyFilter.test(option.sectionHeader.name ?? '');

    if (simpleHeaderMatch || fuzzyHeaderMatch) {
      filtered.push(option);
      continue;
    }

    const sectionOptions = filterSectionOptions(option, simpleFilter, fuzzyFilter);

    if (sectionOptions.length > 0) {
      filtered.push({ ...option, sectionOptions });
    }
  }

  return filtered;
};

const filterSectionOptions = (option: OptionGroup, simpleFilter: RegExp, fuzzyFilter: RegExp) => {
  const simplematch = option.sectionOptions.filter(({ label }) => simpleFilter.test(label));
  const fuzzyMatch = option.sectionOptions
    .filter((o) => !simplematch.includes(o))
    .filter(({ label }) => fuzzyFilter.test(label));

  return [...simplematch, ...fuzzyMatch];
};
