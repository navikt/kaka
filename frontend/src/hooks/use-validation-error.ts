import { useMemo } from 'react';
import { IValidationError, isApiError } from '../functions/error-type-guard';
import { useFullfoerMutation } from '../redux-api/saksdata';
import { IKvalitetsvurdering } from '../types/kvalitetsvurdering';
import { ISaksdata } from '../types/saksdata';

export const useValidationError = (field: keyof IKvalitetsvurdering | keyof ISaksdata): string | undefined => {
  const [, { isError, error }] = useFullfoerMutation();
  console.log('ERROR', isError, error);

  const validationError = useMemo<IValidationError | undefined>(() => {
    // if (!isError) {
    //   return undefined;
    // }

    if (isApiError(error)) {
      return error.data;
    }
  }, [error]);

  if (typeof validationError === 'undefined' || validationError.field !== field) {
    return undefined;
  }

  console.log('VALIDATION ERROR', validationError);

  return validationError.detail;
};
