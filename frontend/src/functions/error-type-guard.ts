import { KVALITETESVURDERING_V1_FIELD_NAMES } from '../components/kvalitetsvurdering/kvalitetsskjema/v1/use-field-name';
import { SAKSDATA_FIELD_NAMES } from '../hooks/use-field-name';
import { IKvalitetsvurdering } from '../types/kvalitetsvurdering/v2';

export interface IValidationError {
  reason: string;
  field:
    | keyof typeof SAKSDATA_FIELD_NAMES
    | keyof typeof KVALITETESVURDERING_V1_FIELD_NAMES
    | keyof IKvalitetsvurdering;
}

export interface IValidationSection {
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

const isValidationSection = (error: unknown): error is IValidationSection =>
  typeof error === 'object' &&
  error !== null &&
  typeof error['section'] === 'string' &&
  Array.isArray(error['properties']);

interface IReduxError<T = unknown> {
  status: number;
  data: T;
}

const isReduxError = <T>(error: unknown): error is IReduxError<T> =>
  typeof error === 'object' && error !== null && typeof error['status'] === 'number';
