import { UNSAFE_DatePicker as Datepicker } from '@navikt/ds-react';
import { format, isAfter, isBefore, isValid, parse, subDays } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isoDateToPretty } from '../../domain/date';
import { FORMAT, PRETTY_FORMAT } from '../filters/date-presets/constants';

interface Props {
  disabled?: boolean;
  error?: string;
  fromDate?: Date;
  id: string;
  label: React.ReactNode;
  onChange: (date: string | null) => void;
  toDate?: Date;
  value: string | null;
  size: 'small' | 'medium';
  centuryThreshold?: number;
}

export const DatepickerWithValidation = ({
  disabled,
  error,
  fromDate = new Date(1970),
  id,
  label,
  onChange,
  toDate = new Date(),
  value,
  size,
  centuryThreshold = 50,
}: Props) => {
  const [inputError, setInputError] = useState<string>();
  const [input, setInput] = useState<string>(value === null ? '' : isoDateToPretty(value) ?? '');

  useEffect(() => {
    setInput(value === null ? '' : isoDateToPretty(value) ?? '');
    setInputError(undefined);
  }, [value]);

  const selected = useMemo(() => (value === null ? undefined : parse(value, FORMAT, new Date())), [value]);

  const onDateChange = (date?: Date) => {
    setInputError(undefined);

    if (date === undefined) {
      onChange(null);
    } else {
      onChange(format(date, FORMAT));
    }
  };

  const [month, setMonth] = useState(selected);

  const validateInput = useCallback(
    (fullInput: string) => {
      const date = parse(fullInput, PRETTY_FORMAT, new Date());
      const validFormat = isValid(date);
      const validRange = isAfter(date, subDays(fromDate, 1)) && isBefore(date, toDate);

      if (!validFormat) {
        setInputError('Dato må være på formen DD.MM.ÅÅÅÅ');

        return;
      }

      if (!validRange) {
        setInputError(`Dato må være mellom ${format(fromDate, PRETTY_FORMAT)} og ${format(toDate, PRETTY_FORMAT)}`);

        return;
      }

      setInputError(undefined);
      onChange(format(date, FORMAT));
    },
    [fromDate, onChange, toDate]
  );

  const onInputChange = useCallback(() => {
    if (input === '') {
      setInputError(undefined);
      onChange(null);

      return;
    }

    const parts = input.split('.');

    // Prefix with reasonable century, e.g. 20 for 2022 and 19 for 1999.
    if (isDateParts(parts)) {
      const [dd, mm, yy] = parts;

      const date = `${dd.padStart(2, '0')}.${mm.padStart(2, '0')}.${getFullYear(yy, centuryThreshold)}`;
      setInput(date);
      requestAnimationFrame(() => validateInput(date));

      return;
    }

    validateInput(input);
  }, [centuryThreshold, input, onChange, validateInput]);

  return (
    <Datepicker
      mode="single"
      data-testid={id}
      id={id}
      fromDate={fromDate}
      toDate={toDate}
      defaultSelected={selected}
      selected={selected}
      onSelect={onDateChange}
      locale="nb"
      dropdownCaption
      month={month}
      onMonthChange={setMonth}
      onOpenToggle={() => setMonth(selected)}
    >
      <Datepicker.Input
        error={error ?? inputError}
        label={label}
        disabled={disabled}
        value={input}
        onChange={({ target }) => setInput(target.value)}
        onBlur={onInputChange}
        size={size}
      />
    </Datepicker>
  );
};

const getFullYear = (year: string, centuryThreshold: number): string => {
  if (year.length === 2) {
    const century = Number.parseInt(year, 10) <= centuryThreshold ? '20' : '19';

    return `${century}${year}`;
  }

  return year;
};

const isDateParts = (parts: string[]): parts is [string, string, string] => parts.length === 3;
