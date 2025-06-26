import { type BaseProps, InternalHeader, getFilters } from '@app/components/dropdown/header/common';
import { useCallback } from 'react';

interface Option {
  label: string;
}

interface Props<T extends Option> extends BaseProps {
  options: T[];
  onChange: (filtered: T[]) => void;
}

export const SingleHeader = <T extends Option>({ options, onChange, ...props }: Props<T>) => {
  const onInputChange = useCallback(
    (search: string) => {
      if (search.length === 0) {
        return onChange(options);
      }

      const [fuzzy, simple] = getFilters(search);

      onChange(filterOptions(options, fuzzy, simple));
    },
    [onChange, options],
  );

  return <InternalHeader {...props} onChange={onInputChange} />;
};

const filterOptions = <T extends Option>(
  options: T[],
  fuzzyFilter: RegExp | null,
  simpleFilter: RegExp | null,
): T[] => {
  if (fuzzyFilter === null || simpleFilter === null) {
    return options;
  }

  const simpleMatch = options.filter(({ label }) => simpleFilter.test(label));
  const fuzzyMatch = options.filter((o) => !simpleMatch.includes(o)).filter(({ label }) => fuzzyFilter.test(label));

  return [...simpleMatch, ...fuzzyMatch];
};
