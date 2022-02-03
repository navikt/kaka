import { useMemo } from 'react';
import { isReduxValidationResponse } from '../functions/error-type-guard';
import { useFullfoerMutation } from '../redux-api/saksdata';
import { IKvalitetsvurdering } from '../types/kvalitetsvurdering';
import { ISaksdataIncomplete } from '../types/saksdata';
import { useSaksdataId } from './use-saksdata-id';

type Field = keyof IKvalitetsvurdering | keyof ISaksdataIncomplete;

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
