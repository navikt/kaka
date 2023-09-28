import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { parse } from 'date-fns';
import React from 'react';
import { styled } from 'styled-components';
import { DatepickerWithValidation } from '../../../date-picker/date-picker';
import { FORMAT } from '../../date-presets/constants';
import { AddOptionButton } from './add-option-button';
import { useOnchange } from './use-onchange';

export const DateIntervals = () => {
  const { selectedValues, add, removeIndex, setIdByIndex, setColor } = useOnchange();

  const onChange = (index: number, from: string | null, to: string | null) => {
    if (from === null || to === null) {
      return;
    }

    return setIdByIndex(index, `${from};${to}`);
  };

  return (
    <>
      <AddOptionButton option="2023-01-15;2023-01-24" onAdd={add} />
      {selectedValues.map(([stringInterval, color], index) => {
        const [fromDate = null, toDate = null] = stringInterval.split(';');

        return (
          <Container key={`${stringInterval}-${color}`}>
            <div>
              <DatepickerWithValidation
                label="Fra og med"
                value={fromDate}
                onChange={(value) => onChange(index, value, toDate)}
                toDate={toDate === null ? undefined : parse(toDate, FORMAT, new Date())}
                size="small"
              />

              <DatepickerWithValidation
                label="Til og med"
                value={toDate}
                fromDate={fromDate === null ? undefined : parse(fromDate, FORMAT, new Date())}
                onChange={(value) => onChange(index, fromDate, value)}
                size="small"
              />
            </div>

            <Buttons>
              <StyledColorPicker
                type="color"
                value={color}
                onChange={({ target }) => setColor(stringInterval, target.value)}
              />

              <Button
                onClick={() => removeIndex(index)}
                size="small"
                icon={<TrashIcon aria-hidden />}
                variant="danger"
              />
            </Buttons>
          </Container>
        );
      })}
    </>
  );
};

const StyledColorPicker = styled.input`
  width: 30px;
  min-width: 30px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;
