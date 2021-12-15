import { useMemo } from 'react';
import { IValidationSection, isReduxValidationResponse } from '../functions/error-type-guard';
import { useFullfoerMutation } from '../redux-api/saksdata';
import { IKvalitetsvurdering } from '../types/kvalitetsvurdering';
import { ISaksdata } from '../types/saksdata';
import { useSaksdataId } from './use-saksdata-id';

type Field = keyof IKvalitetsvurdering | keyof ISaksdata;

export const useValidationError = (field: Field): string | undefined => {
  const id = useSaksdataId();
  const [, { error }] = useFullfoerMutation({
    fixedCacheKey: id,
  });

  const allProperties = useMemo(
    () => (isReduxValidationResponse(error) ? error.data.sections.flatMap(({ properties }) => properties) : []),
    [error]
  );

  return useMemo(() => allProperties?.find((p) => p.field === field)?.reason, [allProperties, field]);
};

export const useAllValidationErrors = (): IValidationSection[] => {
  const id = useSaksdataId();
  const [, { error }] = useFullfoerMutation({
    fixedCacheKey: id,
  });

  return isReduxValidationResponse(error) ? error.data.sections : [];
};
