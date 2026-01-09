import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { subMonths, subYears } from 'date-fns';
import {
  DEC_31_2022,
  DEC_31_2023,
  DEC_31_2024,
  DEC_31_2025,
  END_OF_LAST_MONTH,
  IS_BEFORE_2026,
  IS_BEFORE_2027,
  IS_BEFORE_FEBRUARY_2026,
  IS_BEFORE_MAY_2026,
  IS_BEFORE_SEPTEMBER_2026,
  JAN_1_2022,
  JAN_1_2023,
  JAN_1_2024,
  JAN_1_2025,
  LAST_YEAR_END,
  LAST_YEAR_START,
  NOW,
  ONE_YEAR_AGO,
  START_OF_LAST_MONTH,
  START_OF_MONTH,
  START_OF_YEAR,
} from '../date-presets/constants';
import { getLastTertial } from '../date-presets/get-last-tertial';
import type { IOption } from '../date-presets/types';
import { useVersionQueryFilter } from './use-query-filter';

export const useDatePresets = (): IOption[] => {
  const version = useVersionQueryFilter();

  switch (version) {
    case KvalitetsvurderingVersion.V1:
      return [{ label: 'Hele 2022', fromDate: JAN_1_2022, toDate: DEC_31_2022 }];
    case KvalitetsvurderingVersion.V2: {
      const presets: IOption[] = [];

      if (IS_BEFORE_2026) {
        presets.push({ label: 'Denne måneden', fromDate: START_OF_MONTH, toDate: NOW });
      }

      if (IS_BEFORE_MAY_2026) {
        presets.push({ label: 'Siste tertial', ...getLastTertial(NOW) });
      }

      if (IS_BEFORE_SEPTEMBER_2026) {
        presets.push({ label: 'Nest siste tertial', ...getLastTertial(subMonths(NOW, 4)) });
      }

      if (IS_BEFORE_2027) {
        presets.push({ label: 'Siste 12 mnd', fromDate: ONE_YEAR_AGO, toDate: NOW });
      }

      if (IS_BEFORE_2026) {
        presets.push({ label: 'I år', fromDate: START_OF_YEAR, toDate: NOW });
      }

      if (IS_BEFORE_2027) {
        presets.push({ label: 'I fjor', fromDate: LAST_YEAR_START, toDate: LAST_YEAR_END });
      }

      presets.push({ label: 'Hele 2023', fromDate: JAN_1_2023, toDate: DEC_31_2023 });
      presets.push({ label: 'Hele 2024', fromDate: JAN_1_2024, toDate: DEC_31_2024 });
      presets.push({ label: 'Hele 2025', fromDate: JAN_1_2025, toDate: DEC_31_2025 });

      return presets;
    }
    case KvalitetsvurderingVersion.V3: {
      const presets: IOption[] = [{ label: 'Denne måneden', fromDate: START_OF_MONTH, toDate: NOW }];

      if (!IS_BEFORE_MAY_2026) {
        presets.push({ label: 'Siste tertial', ...getLastTertial(NOW) });
      }

      if (!IS_BEFORE_SEPTEMBER_2026) {
        presets.push({ label: 'Nest siste tertial', ...getLastTertial(subMonths(NOW, 4)) });
      }

      presets.push({ label: 'Siste 12 mnd', fromDate: ONE_YEAR_AGO, toDate: NOW });

      presets.push({ label: 'I år', fromDate: START_OF_YEAR, toDate: NOW });

      if (!IS_BEFORE_2027) {
        presets.push({ label: 'I fjor', fromDate: LAST_YEAR_START, toDate: LAST_YEAR_END });
      }

      return presets.concat(getUpToLast3Years(2026));
    }
  }
};

const getUpToLast3Years = (startYear: number): IOption[] => {
  const lastFullYear = subYears(NOW, 1).getFullYear();

  if (lastFullYear < startYear) {
    return [];
  }

  const firstYear: number = Math.max(startYear, lastFullYear - 2);

  return Array(lastFullYear - firstYear + 1)
    .fill(null)
    .map((_, index) => {
      const year = firstYear + index;

      return {
        label: `Hele ${year}`,
        fromDate: new Date(`${year}-01-01`),
        toDate: new Date(`${year}-12-31`),
      };
    });
};

export const useDatePresetsLeder = (): IOption[] => {
  const version = useVersionQueryFilter();

  switch (version) {
    case KvalitetsvurderingVersion.V1: {
      return [];
    }
    case KvalitetsvurderingVersion.V2: {
      const presets: IOption[] = [];

      if (IS_BEFORE_FEBRUARY_2026) {
        presets.push({
          label: 'Siste måned',
          fromDate: START_OF_LAST_MONTH,
          toDate: END_OF_LAST_MONTH,
        });
      }

      if (IS_BEFORE_MAY_2026) {
        presets.push({ label: 'Siste tertial', ...getLastTertial(NOW) });
      }

      return presets;
    }
    case KvalitetsvurderingVersion.V3: {
      const presets: IOption[] = [];

      if (!IS_BEFORE_FEBRUARY_2026) {
        presets.push({
          label: 'Siste måned',
          fromDate: START_OF_LAST_MONTH,
          toDate: END_OF_LAST_MONTH,
        });
      }

      if (!IS_BEFORE_MAY_2026) {
        presets.push({ label: 'Siste tertial', ...getLastTertial(NOW) });
      }

      return presets;
    }
  }
};
