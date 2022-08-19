export const isNotUndefined = <T>(value: T | undefined): value is T => typeof value !== 'undefined';
// eslint-disable-next-line import/no-unused-modules
export const isNotNull = <T>(value: T | null): value is T => value !== null;
