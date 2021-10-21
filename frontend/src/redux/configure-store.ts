import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { kvalitetsvurderingerApi } from '../redux-api/kvalitetsvurderinger';
import { RootState, rootReducer } from './root';

export const reduxStore = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions.
        ignoredActionPaths: [
          'payload.payload.file',
          'payload.file',
          'meta.baseQueryMeta.request',
          'meta.baseQueryMeta.response',
        ],
      },
    }).concat([kvalitetsvurderingerApi.middleware]),
});

export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
