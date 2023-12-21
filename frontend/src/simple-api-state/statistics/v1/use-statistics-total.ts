import { skipToken } from '@reduxjs/toolkit/query';
import { IStatisticsQuery, IStatisticsResponseTotalV1 } from '@app/types/statistics/v1';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseTotalV1, IStatisticsQuery>('/statistics/v1/total');

export const useStatisticsTotal = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
