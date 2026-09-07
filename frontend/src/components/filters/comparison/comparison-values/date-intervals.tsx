import { ColorToken, isToken } from '@app/components/statistikk/colors/token-name';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';
import { parse } from 'date-fns';
import { DatepickerWithValidation } from '../../../date-picker/date-picker';
import { FORMAT } from '../../date-presets/constants';
import { AddOptionButton } from './add-option-button';
import { useOnchange } from './use-onchange';

export const DateIntervals = () => {
  const { selectedValues, add, removeIndex, setIdByIndex, setColor } = useOnchange();

  const onChange = (index: number, from: string | null, to: string | null) =>
    setIdByIndex(index, `${from ?? 'null'};${to ?? 'null'}`);

  return (
    <>
      <AddOptionButton option="null;null" onAdd={add} />
      {selectedValues.map(([stringInterval, color], index) => {
        const [fromDate = null, toDate = null] = stringInterval
          .split(';')
          .map((date) => (date === 'null' ? null : date));

        return (
          <HStack key={`${stringInterval}-${color}`} wrap={false} align="center" justify="space-between">
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
            <HStack wrap={false} gap="space-8">
              <input
                type="color"
                className="w-7.5 min-w-7.5"
                value={color}
                onChange={({ target }) =>
                  setColor(stringInterval, isToken(target.value) ? target.value : ColorToken.Beige500)
                }
              />

              <Button
                data-color="danger"
                onClick={() => removeIndex(index)}
                size="small"
                icon={<TrashIcon aria-hidden />}
                variant="primary"
              />
            </HStack>
          </HStack>
        );
      })}
    </>
  );
};
