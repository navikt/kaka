import { useMemo } from 'react';
import { GroupErrorField } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/types';
import { isReduxValidationResponse } from '@app/functions/error-type-guard';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useFullfoerMutation } from '@app/redux-api/saksdata';
import { IKvalitetsvurderingData } from '@app/types/kvalitetsvurdering/v2';
import { ISaksdataIncomplete } from '@app/types/saksdata';

type Field = keyof IKvalitetsvurderingData | keyof ISaksdataIncomplete | GroupErrorField;

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
