import type { KVALITETESVURDERING_V1_FIELD_NAMES } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v1/use-field-name';
import type { SAKSDATA_FIELD_NAMES } from '@app/hooks/use-field-name';
import type { IKvalitetsvurderingData } from '@app/types/kvalitetsvurdering/v2';
import { type GenericObject, isGenericObject } from '@app/types/types';

export interface IValidationErrorV1 {
  reason: string;
  field:
    | keyof typeof SAKSDATA_FIELD_NAMES
    | keyof typeof KVALITETESVURDERING_V1_FIELD_NAMES
    | keyof IKvalitetsvurderingData;
}

interface IValidationErrorV2 {
  field: keyof IKvalitetsvurderingData;
  reason: string;
}

type IValidationError = IValidationErrorV1 | IValidationErrorV2;

export interface IValidationSection extends GenericObject {
  section: 'kvalitetsvurdering' | 'saksdata';
  properties: IValidationError[];
}

interface IApiValidationResponse {
  status: number;
  title: string;
  sections: IValidationSection[];
}

export const isReduxValidationResponse = (error: unknown): error is IReduxError<IApiValidationResponse> => {
  if (!isReduxError<IApiValidationResponse>(error)) {
    return false;
  }

  const { data } = error;

  if (typeof data !== 'object' || data === null) {
    return false;
  }

  return Array.isArray(data.sections) && data.sections.every(isValidationSection);
};

const isValidationSection = (error: GenericObject): error is IValidationSection =>
  typeof error.section === 'string' && Array.isArray(error.properties);

interface IReduxError<T = unknown> {
  status: number;
  data: T;
}

const isReduxError = <T>(error: unknown): error is IReduxError<T> =>
  isGenericObject(error) && typeof error.status === 'number';
