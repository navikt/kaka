import { format } from 'date-fns';
import {
  DEC_1_2022,
  FORMATTED_DEC_1_2022,
  FORMATTED_DEC_31_2022,
  FORMATTED_NOW,
  FORMATTED_START_OF_LAST_MONTH,
  FORMATTED_START_OF_MONTH,
  MONTH_FORMAT,
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

export const DEFAULT_PARAMS_V1_LEDER = {
  [QueryParams.FROM_MONTH]: format(DEC_1_2022, MONTH_FORMAT),
  [QueryParams.TO_MONTH]: format(DEC_1_2022, MONTH_FORMAT),
};

export const DEFAULT_PARAMS_V2_LEDER = {
  [QueryParams.FROM_MONTH]: FORMATTED_START_OF_LAST_MONTH,
  [QueryParams.TO_MONTH]: FORMATTED_START_OF_LAST_MONTH,
};
