import { combineReducers } from 'redux';
import { kodeverkApi } from '../redux-api/kodeverk';
import { kvalitetsvurderingApi } from '../redux-api/kvalitetsvurdering';
import { metadataApi } from '../redux-api/metadata';
import { saksdataApi } from '../redux-api/saksdata';
import { statisticsApi } from '../redux-api/statistics';

export const rootReducer = combineReducers({
  [kvalitetsvurderingApi.reducerPath]: kvalitetsvurderingApi.reducer,
  [saksdataApi.reducerPath]: saksdataApi.reducer,
  [metadataApi.reducerPath]: metadataApi.reducer,
  [kodeverkApi.reducerPath]: kodeverkApi.reducer,
  [statisticsApi.reducerPath]: statisticsApi.reducer,
});
