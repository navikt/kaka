import { LOCALE } from './intl';

export const toPercent = (n: number, decimals = 1): string => {
  if (Number.isNaN(n)) {
    return '0 %';
  }

  return n.toLocaleString(LOCALE, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
