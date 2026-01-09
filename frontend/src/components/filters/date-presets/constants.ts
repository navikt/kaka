import { endOfMonth, endOfYear, format, isBefore, startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';

// Formats
export const FORMAT = 'yyyy-MM-dd';
export const MONTH_FORMAT = 'yyyy-MM';
export const PRETTY_FORMAT = 'dd.MM.yyyy';

// Dates
export const NOW = new Date();
export const JAN_1_2022 = new Date('2022-01-01');
export const DEC_1_2022 = new Date('2022-12-01');
export const DEC_31_2022 = new Date('2022-12-31');
export const JAN_1_2023 = new Date('2023-01-01');
export const DEC_31_2023 = new Date('2023-12-31');
export const JAN_1_2024 = new Date('2024-01-01');
export const DEC_31_2024 = new Date('2024-12-31');
export const JAN_1_2025 = new Date('2025-01-01');
export const DEC_1_2025 = new Date('2025-12-1');
export const DEC_31_2025 = new Date('2025-12-31');
export const JAN_1_2026 = new Date('2026-01-01');

// Months
export const START_OF_MONTH = startOfMonth(NOW);
const LAST_MONTH = subMonths(START_OF_MONTH, 1);
export const START_OF_LAST_MONTH = startOfMonth(LAST_MONTH);
export const END_OF_LAST_MONTH = endOfMonth(LAST_MONTH);

// Years
export const START_OF_YEAR = startOfYear(NOW);
export const ONE_YEAR_AGO = subYears(NOW, 1);
export const LAST_YEAR_START = startOfYear(ONE_YEAR_AGO);
export const LAST_YEAR_END = endOfYear(ONE_YEAR_AGO);

// Formatted full dates
export const FORMATTED_NOW = format(NOW, FORMAT);
export const FORMATTED_START_OF_MONTH = format(START_OF_MONTH, FORMAT);
export const FORMATTED_DEC_1_2022 = format(DEC_1_2022, FORMAT);
export const FORMATTED_DEC_31_2022 = format(DEC_31_2022, FORMAT);
export const FORMATTED_DEC_1_2025 = format(DEC_1_2025, FORMAT);
export const FORMATTED_DEC_31_2025 = format(DEC_31_2025, FORMAT);

// Formatted month dates
export const FORMATTED_LAST_MONTH = format(LAST_MONTH, MONTH_FORMAT);
export const FORMATTED_START_OF_LAST_MONTH = format(START_OF_LAST_MONTH, MONTH_FORMAT);
export const FORMATTED_END_OF_LAST_MONTH = format(END_OF_LAST_MONTH, MONTH_FORMAT);

// Pretty dates
export const PRETTY_START_OF_MONTH = format(START_OF_MONTH, PRETTY_FORMAT);

// Other
export const CENTURY_NUMBER = Number.parseInt(new Date().getFullYear().toString(10).slice(2), 10);
export const IS_BEFORE_FEBRUARY_2023 = isBefore(NOW, new Date('2023-02-01'));
export const IS_BEFORE_FEBRUARY_2026 = isBefore(NOW, new Date('2026-02-01'));
export const IS_BEFORE_2026 = isBefore(NOW, JAN_1_2026);
export const IS_BEFORE_2027 = isBefore(NOW, new Date('2027-01-01'));
export const IS_BEFORE_SEPTEMBER_2026 = isBefore(NOW, new Date('2026-09-01'));
export const IS_BEFORE_MAY_2026 = isBefore(NOW, new Date('2026-05-01'));
