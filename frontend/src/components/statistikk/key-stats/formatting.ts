import { LOCALE } from '../../../domain/intl';

export const cleanNumberDisplay = (n: number | undefined): string =>
  Number.isNaN(n) || typeof n !== 'number' ? '-' : n.toLocaleString(LOCALE);
