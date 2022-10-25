import { UNSAFE_DatePicker as Datepicker } from '@navikt/ds-react';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
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

  const onInputChange = () => {
    if (input === '') {
      setInputError(undefined);
      onChange(null);

      return;
    }

    const date = parse(input, PRETTY_FORMAT, new Date());
    const validFormat = isValid(date);
    const validRange = isAfter(date, fromDate) && isBefore(date, toDate);

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
  };

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
