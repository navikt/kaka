import { HjemlerModeFilter } from '@app/components/filters/types';

export const filterHjemler = (list: string[], hjemlerFilter: string[], mode: HjemlerModeFilter): boolean => {
  if (hjemlerFilter.length === 0) {
    return true;
  }

  switch (mode) {
    case HjemlerModeFilter.INCLUDE_FOR_SOME:
      return list.some((h) => hjemlerFilter.includes(h));
    case HjemlerModeFilter.INCLUDE_ALL_SELECTED:
      return hjemlerFilter.every((h) => list.includes(h));
    case HjemlerModeFilter.INCLUDE_ALL_IN_BEHANDLING:
      return list.length === hjemlerFilter.length && hjemlerFilter.every((h) => list.includes(h));
  }
};
