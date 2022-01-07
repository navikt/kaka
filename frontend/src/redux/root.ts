import { combineReducers } from 'redux';
import { kodeverkApi } from '../redux-api/kodeverk';
import { kvalitetsvurderingApi } from '../redux-api/kvalitetsvurdering';
import { metadataApi } from '../redux-api/metadata';
import { saksdataApi } from '../redux-api/saksdata';

export const rootReducer = combineReducers({
  [kvalitetsvurderingApi.reducerPath]: kvalitetsvurderingApi.reducer,
  [saksdataApi.reducerPath]: saksdataApi.reducer,
  [metadataApi.reducerPath]: metadataApi.reducer,
  [kodeverkApi.reducerPath]: kodeverkApi.reducer,
});
