import type { IStatisticsQuery, IStatisticsResponseMyV1 } from '@app/types/statistics/v1';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseMyV1, IStatisticsQuery>('/statistics/v1/my');

export const useStatisticsMy = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
