import dayjs from 'dayjs';

// Formats
export const FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'YYYY-MM';
export const PRETTY_FORMAT = 'DD.MM.YYYY';

// Dates
export const NOW = dayjs();

// Months
export const START_OF_MONTH = NOW.startOf('month');
const LAST_MONTH = NOW.subtract(1, 'month');
export const START_OF_LAST_MONTH = LAST_MONTH.startOf('month');
export const END_OF_LAST_MONTH = LAST_MONTH.endOf('month');

// Years
export const START_OF_YEAR = NOW.startOf('year');
export const ONE_YEAR_AGO = NOW.subtract(12, 'month');
export const LAST_YEAR_START = ONE_YEAR_AGO.startOf('year');
export const LAST_YEAR_END = ONE_YEAR_AGO.endOf('year');

// Formatted full dates
export const FORMATTED_NOW = NOW.format(FORMAT);
export const FORMATTED_START_OF_MONTH = START_OF_MONTH.format(FORMAT);

// Formatted month dates
export const FORMATTED_LAST_MONTH = LAST_MONTH.format(MONTH_FORMAT);
export const FORMATTED_START_OF_LAST_MONTH = START_OF_LAST_MONTH.format(MONTH_FORMAT);
export const FORMATTED_END_OF_LAST_MONTH = END_OF_LAST_MONTH.format(MONTH_FORMAT);

// Pretty dates
export const PRETTY_START_OF_MONTH = START_OF_MONTH.format(PRETTY_FORMAT);
