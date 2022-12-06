import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IFullStatistics, IStatisticsQuery } from '../../../types/statistics/v2';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IFullStatistics, IStatisticsQuery>('/statistics/v2/my');

// eslint-disable-next-line import/no-unused-modules
export const useStatisticsMy = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
