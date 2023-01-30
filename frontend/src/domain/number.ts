import { LOCALE } from './intl';

export const toPercent = (n: number, decimals = 1) =>
  n.toLocaleString(LOCALE, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
