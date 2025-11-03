import { Select, ToggleGroup } from '@navikt/ds-react';

interface DatasetSelectorProps {
  datasets: { label: string }[];
  onChange: (value: string) => void;
  datasetIndexString: string;
}

export const DatasetSelector = ({ datasets, datasetIndexString, onChange }: DatasetSelectorProps) => {
  if (datasets.length === 1) {
    return null;
  }

  if (datasets.length < 8) {
    return (
      <ToggleGroup size="small" value={datasetIndexString} onChange={onChange}>
        {datasets.map(({ label }, index) => (
          <ToggleGroup.Item key={label} value={index.toString(10)}>
            {label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    );
  }

  return (
    <Select
      size="small"
      label="Velg datasett"
      hideLabel
      value={datasetIndexString}
      onChange={({ target }) => onChange(target.value)}
    >
      {datasets.map(({ label }, index) => (
        <option key={label} value={index.toString(10)}>
          {label}
        </option>
      ))}
    </Select>
  );
};
