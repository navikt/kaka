import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import React from 'react';
import styled from 'styled-components';
import { FilterType } from '../../types';

export interface CheckboxesProps {
  selected: string[];
  filters: FilterType[];
  onCheck: (id: string, checked: boolean) => void;
}

export const Checkboxes = ({ selected, filters, onCheck }: CheckboxesProps): JSX.Element => (
  <CheckboxGruppe>
    {filters.map(({ id, label, count }) => (
      <StyledCheckbox
        key={id}
        label={`${label}${typeof count === 'undefined' ? '' : ` (${count})`}`}
        value={id}
        onChange={({ target }) => onCheck(target.value, target.checked)}
        checked={selected.includes(id)}
      />
    ))}
  </CheckboxGruppe>
);

const StyledCheckbox = styled(Checkbox)`
  > .skjemaelement__label {
    width: 100%;
  }
`;
