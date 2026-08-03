import { toPercent } from '@app/domain/number';

export const percent = (value: number, total: number): string => `${toPercent(value / total)} (${value})`;
