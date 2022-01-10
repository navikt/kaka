import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';

interface YearFilterProps {
  selectedYear: number;
  setSelectedYear: (years: number) => void;
}

export const YearFilter = ({ selectedYear, setSelectedYear }: YearFilterProps) => {
  const years = [2021, 2022, 2023, 2024];

  return (
    <RadioGruppe legend="År">
      {years.map((year) => (
        <Radio
          name="year"
          key={year}
          label={year}
          checked={selectedYear === year}
          onChange={() => setSelectedYear(year)}
        />
      ))}
    </RadioGruppe>
  );
};
