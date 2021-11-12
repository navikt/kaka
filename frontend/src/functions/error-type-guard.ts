export interface IValidationError {
  detail: string;
  title: string;
  field: string;
}

export interface IApiError {
  status: number;
  data: IValidationError;
}

const requiredFields = [
  ['detail', 'string'],
  ['title', 'string'],
];

export const isValidationError = (error: unknown): error is IValidationError =>
  typeof error === 'object' && error !== null && requiredFields.every(([field, type]) => typeof error[field] === type);

export const isApiError = (error: unknown): error is IApiError => {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  if (typeof error['status'] !== 'number') {
    return false;
  }

  error['data'].field = 'sakstype';
  return isValidationError(error['data']);
};
