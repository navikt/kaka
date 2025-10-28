export interface FilterType<T extends string | number = string> {
  id: T;
  label: string;
}

export enum TilbakekrevingEnum {
  INCLUDE = 'include',
  EXCLUDE = 'exclude',
  ONLY = 'only',
}

export enum HjemlerModeFilter {
  INCLUDE_FOR_SOME = 'noen',
  INCLUDE_ALL_SELECTED = 'filtrerte',
  INCLUDE_ALL_IN_BEHANDLING = 'all',
}
