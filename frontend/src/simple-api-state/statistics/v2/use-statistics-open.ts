import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IStatistics, IStatisticsQuery } from '../../../types/statistics/v2';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatistics, IStatisticsQuery>('/statistics/v2/open');

// eslint-disable-next-line import/no-unused-modules
export const useStatisticsOpen = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
