import { kvalitetsvurderingV2Api } from '@app/redux-api/kvalitetsvurdering/v2';
import { kvalitetsvurderingV3Api } from '@app/redux-api/kvalitetsvurdering/v3';
import { saksdataApi } from '@app/redux-api/saksdata';
import { configureStore } from '@reduxjs/toolkit';
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
    }).concat([kvalitetsvurderingV2Api.middleware, kvalitetsvurderingV3Api.middleware, saksdataApi.middleware]),
});
