import { StatisticsVersion } from '@app/types/saksdata';
import { DEC_31_2022, DEC_31_2025, JAN_1_2022, JAN_1_2023, JAN_1_2025, NOW } from '../date-presets/constants';
import { useVersionQueryFilter } from './use-query-filter';

export const useValidDateInterval = (): { validFrom: Date; validTo: Date } => {
  const version = useVersionQueryFilter();

  switch (version) {
    case StatisticsVersion.V1:
      return { validFrom: JAN_1_2022, validTo: DEC_31_2022 };
    case StatisticsVersion.V2:
      return { validFrom: JAN_1_2023, validTo: DEC_31_2025 };
    case StatisticsVersion.V3:
      return { validFrom: JAN_1_2025, validTo: NOW };
  }
};
