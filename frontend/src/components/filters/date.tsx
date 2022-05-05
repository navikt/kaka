import { Error } from '@navikt/ds-icons';
import { Datepicker, DatepickerChange } from 'nav-datovelger';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  date: string;
  onChange: (date: string) => void;
  maxDate?: string;
  minDate?: string;
}

export const DateFilter = ({ label, date, maxDate, minDate, onChange }: Props) => {
  const [inputError, setInputError] = useState<string>();

  const onChangeWithValidation: DatepickerChange = (newValue, isValidISODateString) => {
    if (isValidISODateString) {
      setInputError(undefined);

      onChange(newValue);
      return;
    }

    setInputError('Dato må være på formen DD.MM.ÅÅÅÅ');
  };

  return (
    <Label>
      <LabelText>{label}:</LabelText>
      <DateAndError>
        <Datepicker
          onChange={onChangeWithValidation}
          value={date}
          showYearSelector
          limitations={{ maxDate, minDate }}
          calendarSettings={{ showWeekNumbers: true }}
        />
        <ErrorIndicator error={inputError} />
      </DateAndError>
    </Label>
  );
};

interface ErrorProps {
  error?: string;
}

const ErrorIndicator = ({ error }: ErrorProps) =>
  typeof error === 'undefined' ? null : <StyledError title="Dato må være på formen DD.MM.ÅÅÅÅ"></StyledError>;

const Label = styled.label`
  display: block;
  width: fit-content;
  cursor: pointer;
`;

const LabelText = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 700;
`;

const DateAndError = styled.div`
  display: flex;
  align-items: center;
`;

const StyledError = styled(Error)`
  color: #ba3a26;
  margin-left: 12px;
  width: 20px;
  height: 20px;
`;
