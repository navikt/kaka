export interface FilterType<T extends string | number = string> {
  id: T;
  label: string;
}

export enum TilbakekrevingEnum {
  INCLUDE = 'include',
  EXCLUDE = 'exclude',
  ONLY = 'only',
}
