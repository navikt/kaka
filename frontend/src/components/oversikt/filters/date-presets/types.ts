import dayjs from 'dayjs';

export interface DateRange {
  fromDate: dayjs.Dayjs;
  toDate: dayjs.Dayjs;
}
export interface IOption extends DateRange {
  label: string;
}
