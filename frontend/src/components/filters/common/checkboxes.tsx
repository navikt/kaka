import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { styled } from 'styled-components';
import type { FilterType } from '../types';

export interface CheckboxesProps<T extends string | number> {
  selected: T[];
  filters: FilterType<T>[];
  onCheck: (id: string, checked: boolean) => void;
}

export const Checkboxes = <T extends string | number>({
  selected,
  filters,
  onCheck,
}: CheckboxesProps<T>): JSX.Element => (
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
`;
