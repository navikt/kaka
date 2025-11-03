import type { IStatisticsQuery, IStatisticsResponseOpenV3 } from '@app/types/statistics/v3';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseOpenV3, IStatisticsQuery>('/statistics/v3/open');

export const useStatisticsOpen = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
