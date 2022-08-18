import { combineReducers } from 'redux';
import { kvalitetsvurderingApi } from '../redux-api/kvalitetsvurdering';
import { saksdataApi } from '../redux-api/saksdata';
import { statisticsApi } from '../redux-api/statistics';

export const rootReducer = combineReducers({
  [kvalitetsvurderingApi.reducerPath]: kvalitetsvurderingApi.reducer,
  [saksdataApi.reducerPath]: saksdataApi.reducer,
  [statisticsApi.reducerPath]: statisticsApi.reducer,
});
