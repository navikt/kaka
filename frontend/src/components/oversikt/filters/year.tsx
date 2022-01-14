import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { ToggleContent } from '../../toggle/toggle-content';

interface YearFilterProps {
  selectedYear: number;
  setSelectedYear: (years: number) => void;
}

export const YearFilter = ({ selectedYear, setSelectedYear }: YearFilterProps) => {
  const years = [2021, 2022, 2023, 2024];

  return (
    <ToggleContent label="År">
      <RadioGruppe>
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
    </ToggleContent>
  );
};
