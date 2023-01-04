import { format, isAfter, subMonths } from 'date-fns';
import {
  DEC_1_2022,
  FORMATTED_DEC_1_2022,
  FORMATTED_DEC_31_2022,
  FORMATTED_NOW,
  FORMATTED_START_OF_MONTH,
  JAN_1_2023,
  JAN_31_2023,
  MONTH_FORMAT,
  NOW,
} from '../date-presets/constants';
import { QueryParams } from '../filter-query-params';

export type DefaultParams = Partial<Record<QueryParams, string>>;

export const DEFAULT_PARAMS_V1: DefaultParams = {
  [QueryParams.FROM_DATE]: FORMATTED_DEC_1_2022,
  [QueryParams.TO_DATE]: FORMATTED_DEC_31_2022,
};

export const DEFAULT_PARAMS_V2: DefaultParams = {
  [QueryParams.FROM_DATE]: FORMATTED_START_OF_MONTH,
  [QueryParams.TO_DATE]: FORMATTED_NOW,
};

export const DEFAULT_PARAMS_V1_LEDER = { [QueryParams.FROM_MONTH]: format(DEC_1_2022, MONTH_FORMAT) };
export const DEFAULT_PARAMS_V2_LEDER = {
  [QueryParams.FROM_MONTH]: format(isAfter(NOW, JAN_31_2023) ? subMonths(NOW, 1) : JAN_1_2023, MONTH_FORMAT),
};
