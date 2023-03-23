import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { IStatisticsResponseVedtaksinstanslederV1, IVedtaksinstanslederQuery } from '@app/types/statistics/v1';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<IStatisticsResponseVedtaksinstanslederV1, IVedtaksinstanslederQuery>(
  '/statistics/v1/vedtaksinstansleder'
);

export const useStatisticsVedtaksinstansleder = (query: IVedtaksinstanslederQuery | typeof skipToken) =>
  useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
