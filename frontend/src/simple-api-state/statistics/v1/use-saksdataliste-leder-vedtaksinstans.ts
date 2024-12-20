import type { ISaksdatalisteLederVedtaksinstans, ISaksdatalisteLederVedtaksinstansParamsV1 } from '@app/types/saksdata';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<ISaksdatalisteLederVedtaksinstans, ISaksdatalisteLederVedtaksinstansParamsV1>(
  '/saksdatalisteledervedtaksinstans/v1',
);

export const useSaksdatalisteLederVedtaksinstans = (
  query: ISaksdatalisteLederVedtaksinstansParamsV1 | typeof skipToken,
) => useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
