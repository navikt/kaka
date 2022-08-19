import { Datepicker, DatepickerChange } from '@navikt/ds-datepicker';
import React, { useCallback, useState } from 'react';
import '@navikt/ds-datepicker/lib/index.css';

type DateTimePickerProps = React.ComponentPropsWithoutRef<typeof Datepicker>;

export const DatepickerWithValidation = ({ onChange, error, ...props }: DateTimePickerProps) => {
  const [inputError, setInputError] = useState<string>();

  const onChangeWithValidation: DatepickerChange = useCallback(
    (newValue, isValidISODateString) => {
      if (newValue.length === 0) {
        onChange('', true);
        setInputError(undefined);

        return;
      }

      if (isValidISODateString) {
        onChange(newValue, isValidISODateString);
        setInputError(undefined);

        return;
      }

      setInputError('Dato må være på formen DD.MM.ÅÅÅÅ');
    },
    [onChange]
  );

  return <Datepicker {...props} error={error ?? inputError} onChange={onChangeWithValidation} />;
};
