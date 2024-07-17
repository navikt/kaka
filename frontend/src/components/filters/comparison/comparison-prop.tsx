import { Select } from '@navikt/ds-react';
import { useSearchParams } from 'react-router-dom';
import { NONE_SELECTED, NoneSelected } from '../../none-selected';
import { getDefaultColor } from '../../statistikk/comparison/get-default-color';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../date-presets/constants';
import { ComparableQueryParams, QueryParams } from '../filter-query-params';
import { useQueryFilter } from '../hooks/use-query-filter';
import { AVERAGE } from './comparison-values/default-options';
import { COMPARISON_PROPS } from './is-comparison-prop';

export const ComparisonProp = () => {
  const value = useQueryFilter(QueryParams.COMPARISON_PROP) ?? undefined;
  const options = COMPARISON_PROPS.map((key) => ({ label: getComparisonLabel(key), id: key }));
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Select
      label="Sammenlikne på tvers av"
      size="small"
      value={value ?? NONE_SELECTED}
      onChange={({ target }) => {
        const values = JSON.stringify([[getDefaultValue(target.value), getDefaultColor([])]]);

        searchParams.set(QueryParams.COMPARISON_VALUES, values);
        searchParams.set(QueryParams.COMPARISON_PROP, target.value);

        setSearchParams(searchParams, { replace: true });
      }}
    >
      <NoneSelected value={value} />
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

const getDefaultValue = (value: string) => {
  switch (value) {
    case ComparableQueryParams.DATE_INTERVALS:
      return `${FORMATTED_START_OF_MONTH};${FORMATTED_NOW}`;
    default:
      return AVERAGE;
  }
};

const getComparisonLabel = (value: ComparableQueryParams) => {
  switch (value) {
    case ComparableQueryParams.ENHETER:
      return 'Enheter';
    case ComparableQueryParams.KLAGEENHETER:
      return 'Klageenheter';
    case ComparableQueryParams.HJEMLER:
      return 'Hjemler';
    case ComparableQueryParams.UTFALL:
      return 'Utfall';
    case ComparableQueryParams.VEDTAKSINSTANSGRUPPER:
      return 'Vedtaksinstansgrupper';
    case ComparableQueryParams.YTELSER:
      return 'Ytelser';
    case ComparableQueryParams.DATE_INTERVALS:
      return 'Dato';
  }
};
