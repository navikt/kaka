import type { IStatisticsResponseVedtaksinstanslederV2, IVedtaksinstanslederQuery } from '@app/types/statistics/v2';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseVedtaksinstanslederV2, IVedtaksinstanslederQuery>(
  '/statistics/v2/vedtaksinstansleder',
);

export const useStatisticsVedtaksinstansleder = (query: IVedtaksinstanslederQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
