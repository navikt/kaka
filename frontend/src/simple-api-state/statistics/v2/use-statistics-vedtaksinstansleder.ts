import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IStatistics, IVedtaksinstanslederQuery } from '../../../types/statistics/v2';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatistics, IVedtaksinstanslederQuery>('/statistics/v2/vedtaksinstansleder');

// eslint-disable-next-line import/no-unused-modules
export const useStatisticsVedtaksinstansleder = (query: IVedtaksinstanslederQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
