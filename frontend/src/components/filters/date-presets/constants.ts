import { endOfMonth, endOfYear, format, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';

// Formats
export const FORMAT = 'yyyy-MM-dd';
export const MONTH_FORMAT = 'yyyy-MM';
export const PRETTY_FORMAT = 'dd.MM.yyyy';

// Dates
export const NOW = new Date();

// Months
export const START_OF_MONTH = startOfMonth(NOW);
const LAST_MONTH = subMonths(START_OF_MONTH, 1);
export const START_OF_LAST_MONTH = startOfMonth(LAST_MONTH);
export const END_OF_LAST_MONTH = endOfMonth(LAST_MONTH);

// Years
export const START_OF_YEAR = startOfYear(NOW);
export const ONE_YEAR_AGO = subYears(START_OF_YEAR, 1);
export const LAST_YEAR_START = startOfYear(ONE_YEAR_AGO);
export const LAST_YEAR_END = endOfYear(ONE_YEAR_AGO);

// Formatted full dates
export const FORMATTED_NOW = format(NOW, FORMAT);
export const FORMATTED_START_OF_MONTH = format(START_OF_MONTH, FORMAT);

// Formatted month dates
export const FORMATTED_LAST_MONTH = format(LAST_MONTH, MONTH_FORMAT);
export const FORMATTED_START_OF_LAST_MONTH = format(START_OF_LAST_MONTH, MONTH_FORMAT);
export const FORMATTED_END_OF_LAST_MONTH = format(END_OF_LAST_MONTH, MONTH_FORMAT);

// Pretty dates
export const PRETTY_START_OF_MONTH = format(START_OF_MONTH, PRETTY_FORMAT);
