import { isGenericObject } from './types';

interface ApiError {
  type: string; // about:blank
  title: string; // Bad Request
  status: number; // 400
  detail: string; // Failed to read request
  instance: string; // /behandlinger/:id/mottattklageinstans
}

export const isApiError = (error: unknown): error is ApiError =>
  isGenericObject(error) &&
  'type' in error &&
  'title' in error &&
  'status' in error &&
  'instance' in error &&
  typeof error.type === 'string' &&
  typeof error.title === 'string' &&
  typeof error.status === 'number' &&
  typeof error.instance === 'string';
