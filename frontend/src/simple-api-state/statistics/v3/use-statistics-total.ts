import type { IStatisticsQuery, IStatisticsResponseTotalV3 } from '@app/types/statistics/v3';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseTotalV3, IStatisticsQuery>('/statistics/v3/total');

export const useStatisticsTotal = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
