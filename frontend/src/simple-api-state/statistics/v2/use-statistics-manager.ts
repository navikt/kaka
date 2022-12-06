import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IFullStatistics, IManagerStatisticsQuery } from '../../../types/statistics/v2';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IFullStatistics, Omit<IManagerStatisticsQuery, 'enhetId'>>('/statistics/v2/enheter');

// eslint-disable-next-line import/no-unused-modules
export const useStatisticsManager = (query: IManagerStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState(getParams(query)));

const getParams = ({ enhetId, ...query }: IManagerStatisticsQuery) => ({ query, path: `/${enhetId}/manager` });
