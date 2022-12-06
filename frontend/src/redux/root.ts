import { combineReducers } from 'redux';
import { kvalitetsvurderingV1Api } from '../redux-api/kvalitetsvurdering/v1';
import { kvalitetsvurderingV2Api } from '../redux-api/kvalitetsvurdering/v2';
import { saksdataApi } from '../redux-api/saksdata';

export const rootReducer = combineReducers({
  [kvalitetsvurderingV1Api.reducerPath]: kvalitetsvurderingV1Api.reducer,
  [kvalitetsvurderingV2Api.reducerPath]: kvalitetsvurderingV2Api.reducer,
  [saksdataApi.reducerPath]: saksdataApi.reducer,
});
