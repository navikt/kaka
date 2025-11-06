import type { IStatisticsResponseVedtaksinstanslederV3, IVedtaksinstanslederQuery } from '@app/types/statistics/v3';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseVedtaksinstanslederV3, IVedtaksinstanslederQuery>(
  '/statistics/v3/vedtaksinstansleder',
);

export const useStatisticsVedtaksinstansleder = (query: IVedtaksinstanslederQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
