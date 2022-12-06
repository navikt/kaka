import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IStatistics, IStatisticsQuery } from '../../../types/statistics/v1';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatistics, IStatisticsQuery>('/statistics/v1/open');

export const useStatisticsOpen = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
