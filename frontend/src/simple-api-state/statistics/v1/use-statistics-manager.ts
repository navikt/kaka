import { skipToken } from '@reduxjs/toolkit/query';
import { IManagerStatisticsQuery, IStatisticsResponseManagerV1 } from '@app/types/statistics/v1';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseManagerV1, Omit<IManagerStatisticsQuery, 'enhetId'>>(
  '/statistics/v1/enheter',
);

export const useStatisticsManager = (query: IManagerStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState(getParams(query)));

const getParams = ({ enhetId, ...query }: IManagerStatisticsQuery) => ({ query, path: `/${enhetId}/manager` });
