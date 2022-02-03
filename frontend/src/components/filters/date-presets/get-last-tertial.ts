import dayjs from 'dayjs';
import { DateRange } from './types';

export const getLastTertial = (now: dayjs.Dayjs): DateRange => {
  const offset = now.month() % 4; // now.month() is zero-based.
  // January = 0 => 0
  // May = 4 => 0
  // September = 8 => 0

  const fromDate = now.subtract(offset + 4, 'month').startOf('month');

  const toDate = now.subtract(offset + 1, 'month').endOf('month');

  return {
    fromDate,
    toDate,
  };
};
