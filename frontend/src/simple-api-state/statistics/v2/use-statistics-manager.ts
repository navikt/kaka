import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IManagerStatisticsQuery, IStatisticsResponseManagerV2 } from '@app/types/statistics/v2';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseManagerV2, Omit<IManagerStatisticsQuery, 'enhetId'>>(
  '/statistics/v2/enheter'
);

export const useStatisticsManager = (query: IManagerStatisticsQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState(getParams(query)));

const getParams = ({ enhetId, ...query }: IManagerStatisticsQuery) => ({ query, path: `/${enhetId}/manager` });
