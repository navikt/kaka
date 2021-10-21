import { combineReducers } from 'redux';
import { kvalitetsvurderingerApi } from '../redux-api/kvalitetsvurderinger';

export const rootReducer = combineReducers({
  [kvalitetsvurderingerApi.reducerPath]: kvalitetsvurderingerApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
