import { kvalitetsvurderingV1Api } from '@app/redux-api/kvalitetsvurdering/v1';
import { kvalitetsvurderingV2Api } from '@app/redux-api/kvalitetsvurdering/v2';
import { saksdataApi } from '@app/redux-api/saksdata';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  [kvalitetsvurderingV1Api.reducerPath]: kvalitetsvurderingV1Api.reducer,
  [kvalitetsvurderingV2Api.reducerPath]: kvalitetsvurderingV2Api.reducer,
  [saksdataApi.reducerPath]: saksdataApi.reducer,
});
