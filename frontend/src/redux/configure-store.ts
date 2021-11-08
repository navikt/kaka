import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { kvalitetsvurderingApi } from '../redux-api/kvalitetsvurdering';
import { metadataApi } from '../redux-api/metadata';
import { saksdataApi } from '../redux-api/saksdata';
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
    }).concat([kvalitetsvurderingApi.middleware, saksdataApi.middleware, metadataApi.middleware]),
});

export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
