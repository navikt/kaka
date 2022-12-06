import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { ISaksdatalisteLederVedtaksinstans, ISaksdatalisteLederVedtaksinstansParams } from '../../types/saksdata';
import { useSimpleApiState } from '../simple-api-state';
import { getStateFactory } from '../state-factory';

const getState = getStateFactory<ISaksdatalisteLederVedtaksinstans, ISaksdatalisteLederVedtaksinstansParams>(
  '/saksdatalisteledervedtaksinstans'
);

export const useSaksdatalisteLederVedtaksinstans = (
  query: ISaksdatalisteLederVedtaksinstansParams | typeof skipToken
) => useSimpleApiState(query === skipToken ? skipToken : getState({ query }));
