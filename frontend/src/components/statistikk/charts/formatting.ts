import { toPercent } from '@app/domain/number';

export const percent = (value: number, total: number): string => `${toPercent(value / total)} (${value})`;

export const tickCallback = (value: number | string, total: number): string => {
  if (typeof value === 'string') {
    return value;
  }

  return toPercent(value / total);
};
