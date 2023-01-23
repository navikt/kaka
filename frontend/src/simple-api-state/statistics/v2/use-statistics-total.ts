import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IStatisticsQuery, IStatisticsResponseTotalV2 } from '../../../types/statistics/v2';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseTotalV2, IStatisticsQuery>('/statistics/v2/total');

export const useStatisticsTotal = (query: IStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
