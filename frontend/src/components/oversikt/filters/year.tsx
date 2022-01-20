import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React, { useState } from 'react';
import { Dropdown } from './common/dropdown';

interface YearFilterProps {
  selectedYear: number;
  setSelectedYear: (years: number) => void;
}

export const YearFilter = ({ selectedYear, setSelectedYear }: YearFilterProps) => {
  const [open, setOpen] = useState(false);
  const years = [2021, 2022, 2023];

  return (
    <Dropdown label="År" open={open} setOpen={setOpen} metadata={selectedYear}>
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
    </Dropdown>
  );
};
