import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { DEC_31_2022, JAN_1_2022, JAN_1_2023, NOW } from '../date-presets/constants';
import { useVersionQueryFilter } from './use-query-filter';

export const useValidDateInterval = () => {
  const version = useVersionQueryFilter();

  switch (version) {
    case KvalitetsvurderingVersion.V1:
      return { validFrom: JAN_1_2022, validTo: DEC_31_2022 };
    case KvalitetsvurderingVersion.V2:
      return { validFrom: JAN_1_2023, validTo: NOW };
  }
};
