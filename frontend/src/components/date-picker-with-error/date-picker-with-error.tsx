import { Datepicker } from 'nav-datovelger';
import { DatepickerProps } from 'nav-datovelger/lib/Datepicker';
import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '../error-message/error-message';

const StyledLabelText = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0.5em;
  line-height: 22px;
`;

const StyledErrorLabel = styled.label`
  & .nav-datovelger {
    border: 1px solid #ba3a26;
    box-shadow: 0 0 0 1px #ba3a26;
    border-radius: 4px;
  }

  & .nav-datovelger__input {
    border: none;
  }

  & .nav-datovelger__kalenderknapp {
    border-right: none;
    border-top: none;
    border-bottom: none;
  }

  & .nav-datovelger__kalenderknapp {
    min-height: 38px;
  }
`;

interface DateTimePickerProps extends DatepickerProps {
  label: string;
  error?: string;
}

export const DatepickerWithError = ({ label, error, ...props }: DateTimePickerProps) => {
  const children = (
    <>
      <StyledLabelText>{label}</StyledLabelText>
      <Datepicker {...props} />
      <ErrorMessage error={error} />
    </>
  );

  if (typeof error !== 'undefined') {
    return <StyledErrorLabel>{children}</StyledErrorLabel>;
  }

  return <label>{children}</label>;
};
