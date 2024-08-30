import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import type { DateRange } from './types';

export const getLastTertial = (now: Date): DateRange => {
  const offset = now.getMonth() % 4; // now.getMonth() is zero-based.
  // January = 0 => 0
  // May = 4 => 0
  // September = 8 => 0

  const fromDate = startOfMonth(subMonths(now, offset + 4));

  const toDate = endOfMonth(subMonths(now, offset + 1));

  return {
    fromDate,
    toDate,
  };
};
