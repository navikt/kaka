import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IStatisticsQuery, IStatisticsResponseMyV2 } from '../../../types/statistics/v2';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseMyV2, IStatisticsQuery>('/statistics/v2/my');

export const useStatisticsMy = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
