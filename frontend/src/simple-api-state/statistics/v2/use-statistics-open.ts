import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IStatisticsQuery, IStatisticsResponseOpenV2 } from '@app/types/statistics/v2';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseOpenV2, IStatisticsQuery>('/statistics/v2/open');

export const useStatisticsOpen = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
