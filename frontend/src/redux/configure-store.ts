import { kvalitetsvurderingV1Api } from '@app/redux-api/kvalitetsvurdering/v1';
import { kvalitetsvurderingV2Api } from '@app/redux-api/kvalitetsvurdering/v2';
import { saksdataApi } from '@app/redux-api/saksdata';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer } from './root';

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
    }).concat([kvalitetsvurderingV1Api.middleware, kvalitetsvurderingV2Api.middleware, saksdataApi.middleware]),
});

type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
