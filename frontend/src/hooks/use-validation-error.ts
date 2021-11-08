import { useContext } from 'react';
import { ValidationErrorContext } from '../components/kvalitetsregistrering/validation-error-context';
import { IKvalitetsvurdering } from '../types/kvalitetsvurdering';
import { ISaksdata } from '../types/saksdata';

export const useValidationError = (field: keyof IKvalitetsvurdering | keyof ISaksdata): string | undefined => {
  const context = useContext(ValidationErrorContext);

  return context?.validationErrors.find((e) => e.field === field)?.reason;
};
