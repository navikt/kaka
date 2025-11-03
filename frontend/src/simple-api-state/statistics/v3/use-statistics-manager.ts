import type { IManagerStatisticsQuery, IStatisticsResponseManagerV3 } from '@app/types/statistics/v3';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseManagerV3, Omit<IManagerStatisticsQuery, 'enhetId'>>(
  '/statistics/v3/enheter',
);

export const useStatisticsManager = (query: IManagerStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState(getParams(query)));

const getParams = ({ enhetId, ...query }: IManagerStatisticsQuery) => ({ query, path: `/${enhetId}/manager` });
