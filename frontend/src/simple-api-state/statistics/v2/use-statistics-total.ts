import type { IStatisticsQuery, IStatisticsResponseTotalV2 } from '@app/types/statistics/v2';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseTotalV2, IStatisticsQuery>('/statistics/v2/total');

export const useStatisticsTotal = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
