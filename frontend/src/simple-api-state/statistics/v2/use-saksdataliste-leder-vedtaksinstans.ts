import { skipToken } from '@reduxjs/toolkit/query';
import { ISaksdatalisteLederVedtaksinstans, ISaksdatalisteLederVedtaksinstansParamsV2 } from '@app/types/saksdata';
import { useSimpleApiState } from '../../simple-api-state';
import { getStateFactory } from '../../state-factory';

const getState = getStateFactory<ISaksdatalisteLederVedtaksinstans, ISaksdatalisteLederVedtaksinstansParamsV2>(
  '/saksdatalisteledervedtaksinstans/v2',
);

export const useSaksdatalisteLederVedtaksinstans = (
  query: ISaksdatalisteLederVedtaksinstansParamsV2 | typeof skipToken,
) => useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
