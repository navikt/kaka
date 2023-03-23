import { useMemo } from 'react';
import { isReduxValidationResponse } from '@app/functions/error-type-guard';
import { useFullfoerMutation } from '@app/redux-api/saksdata';
import { IKvalitetsvurderingV1 } from '@app/types/kvalitetsvurdering/v1';
import { ISaksdataIncomplete } from '@app/types/saksdata';
import { useSaksdataId } from './use-saksdata-id';

type Field = keyof IKvalitetsvurderingV1 | keyof ISaksdataIncomplete;

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
