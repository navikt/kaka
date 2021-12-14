import { useMemo } from 'react';
import { IValidationSection, isReduxValidationResponse } from '../functions/error-type-guard';
import { FULLFOER_FIXED_CACHE_KEY, useFullfoerMutation } from '../redux-api/saksdata';
import { IKvalitetsvurdering } from '../types/kvalitetsvurdering';
import { ISaksdata } from '../types/saksdata';

type Field = keyof IKvalitetsvurdering | keyof ISaksdata;

export const useValidationError = (field: Field): string | undefined => {
  const [, { error }] = useFullfoerMutation({
    fixedCacheKey: FULLFOER_FIXED_CACHE_KEY,
  });

  const allProperties = useMemo(
    () => (isReduxValidationResponse(error) ? error.data.sections.flatMap(({ properties }) => properties) : []),
    [error]
  );

  return useMemo(() => allProperties?.find((p) => p.field === field)?.reason, [allProperties, field]);
};

export const useAllValidationErrors = (): IValidationSection[] => {
  const [, { error }] = useFullfoerMutation({
    fixedCacheKey: FULLFOER_FIXED_CACHE_KEY,
  });

  return isReduxValidationResponse(error) ? error.data.sections : [];
};
