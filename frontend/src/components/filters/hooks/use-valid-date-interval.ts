import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { DEC_31_2022, DEC_31_2025, JAN_1_2022, JAN_1_2023, JAN_1_2026, NOW } from '../date-presets/constants';
import { useVersionQueryFilter } from './use-query-filter';

export const useValidDateInterval = (): { validFrom: Date; validTo: Date } => {
  const version = useVersionQueryFilter();

  switch (version) {
    case KvalitetsvurderingVersion.V1:
      return { validFrom: JAN_1_2022, validTo: DEC_31_2022 };
    case KvalitetsvurderingVersion.V2:
      return { validFrom: JAN_1_2023, validTo: DEC_31_2025 };
    case KvalitetsvurderingVersion.V3:
      return { validFrom: JAN_1_2026, validTo: NOW };
  }
};
