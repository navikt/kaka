import type { IManagerStatisticsQuery, IStatisticsResponseManagerV2 } from '@app/types/statistics/v2';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseManagerV2, Omit<IManagerStatisticsQuery, 'enhetId'>>(
  '/statistics/v2/enheter',
);

export const useStatisticsManager = (query: IManagerStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState(getParams(query)));

const getParams = ({ enhetId, ...query }: IManagerStatisticsQuery) => ({ query, path: `/${enhetId}/manager` });
