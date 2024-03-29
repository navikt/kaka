import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import {
  FORMATTED_DEC_1_2022,
  FORMATTED_DEC_31_2022,
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
} from '../date-presets/constants';
import { useVersionQueryFilter } from './use-query-filter';

export const useDefaultDates = () => {
  const version = useVersionQueryFilter();

  switch (version) {
    case KvalitetsvurderingVersion.V1:
      return { defaultFrom: FORMATTED_DEC_1_2022, defaultTo: FORMATTED_DEC_31_2022 };
    case KvalitetsvurderingVersion.V2:
      return { defaultFrom: FORMATTED_START_OF_MONTH, defaultTo: FORMATTED_NOW };
  }
};
