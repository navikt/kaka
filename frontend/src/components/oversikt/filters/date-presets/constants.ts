import dayjs from 'dayjs';

export const NOW = dayjs();
export const ONE_YEAR_AGO = NOW.subtract(12, 'month');
export const LAST_YEAR_START = ONE_YEAR_AGO.startOf('year');
export const LAST_YEAR_END = ONE_YEAR_AGO.endOf('year');
export const FORMAT = 'YYYY-MM-DD';
