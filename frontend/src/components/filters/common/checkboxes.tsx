import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { FilterType } from '../types';

export interface CheckboxesProps {
  selected: string[];
  filters: FilterType[];
  onCheck: (id: string, checked: boolean) => void;
}

export const Checkboxes = ({ selected, filters, onCheck }: CheckboxesProps): JSX.Element => (
  <Container>
    <CheckboxGroup legend={null} hideLegend size="small" value={selected}>
      {filters.map(({ id, label }) => (
        <Checkbox key={id} value={id} onChange={({ target }) => onCheck(target.value, target.checked)}>
          {label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  overflow-y: scroll;
`;
