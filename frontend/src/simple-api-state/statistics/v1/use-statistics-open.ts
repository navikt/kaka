import type { IStatisticsQuery, IStatisticsResponseOpenV1 } from '@app/types/statistics/v1';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseOpenV1, IStatisticsQuery>('/statistics/v1/open');

export const useStatisticsOpen = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
