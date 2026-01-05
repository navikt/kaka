import type { IStatisticsQuery, IStatisticsResponseMyV3 } from '@app/types/statistics/v3';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseMyV3, IStatisticsQuery>('/statistics/v3/my');

export const useStatisticsMy = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
