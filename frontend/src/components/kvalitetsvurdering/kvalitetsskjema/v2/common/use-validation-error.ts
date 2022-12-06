import { useMemo } from 'react';
import { useSaksdataId } from '../../../../../hooks/use-saksdata-id';
import { useFullfoerMutation } from '../../../../../redux-api/saksdata';
import { IKvalitetsvurderingData } from '../../../../../types/kvalitetsvurdering/v2';
import { ISaksdataIncomplete } from '../../../../../types/saksdata';
import { KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES } from './use-field-name';
import { isReduxValidationResponse } from './validation';

type Field =
  | keyof IKvalitetsvurderingData
  | keyof ISaksdataIncomplete
  | keyof typeof KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES;

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
