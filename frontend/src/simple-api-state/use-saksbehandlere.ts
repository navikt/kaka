import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { ISaksbehandler } from '../types/statistics/common';
import { useSimpleApiState } from './simple-api-state';
import { getStateFactory } from './state-factory';

const getState = getStateFactory<ISaksbehandler[], string>('/enheter');

export const useSaksbehandlere = (enhetId: string | typeof skipToken) =>
  useSimpleApiState(enhetId === skipToken ? skipToken : getState({ path: `/${enhetId}/saksbehandlere` }));
