import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { subMonths } from 'date-fns';
import {
  END_OF_LAST_MONTH,
  IS_BEFORE_2026,
  IS_BEFORE_2027,
  IS_BEFORE_FEBRUARY_2026,
  IS_BEFORE_MAY_2026,
  IS_BEFORE_SEPTEMBER_2026,
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
      return [];
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

      return presets;
    }
  }
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
