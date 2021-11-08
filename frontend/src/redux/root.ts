import { combineReducers } from 'redux';
import { kvalitetsvurderingApi } from '../redux-api/kvalitetsvurdering';
import { metadataApi } from '../redux-api/metadata';
import { saksdataApi } from '../redux-api/saksdata';

export const rootReducer = combineReducers({
  [kvalitetsvurderingApi.reducerPath]: kvalitetsvurderingApi.reducer,
  [saksdataApi.reducerPath]: saksdataApi.reducer,
  [metadataApi.reducerPath]: metadataApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
