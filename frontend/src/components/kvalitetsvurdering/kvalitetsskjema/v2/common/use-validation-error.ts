import { useMemo } from 'react';
import { useSaksdataId } from '../../../../../hooks/use-saksdata-id';
import { useFullfoerMutation } from '../../../../../redux-api/saksdata';
import {
  IKvalitetsvurderingData,
  KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES,
} from '../../../../../types/kvalitetsvurdering/v2';
import { ISaksdataIncomplete } from '../../../../../types/saksdata';
import { isReduxValidationResponse } from './validation';

type Field =
  | keyof IKvalitetsvurderingData
  | keyof ISaksdataIncomplete
  | keyof typeof KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES;

export const useValidationError = (field?: Field): string | undefined => {
  const id = useSaksdataId();
  const [, { error }] = useFullfoerMutation({
    fixedCacheKey: id,
  });

  return useMemo(() => {
    if (typeof field === 'undefined') {
      return undefined;
    }

    const allProperties = isReduxValidationResponse(error)
      ? error.data.sections.flatMap(({ properties }) => properties)
      : [];

    return allProperties?.find((p) => p.field === field)?.reason;
  }, [error, field]);
};
