import { createApi } from '@reduxjs/toolkit/query/react';
import { IKodeverk } from '../types/kodeverk';
import { baseQuery } from './common';

export const kodeverkApi = createApi({
  reducerPath: 'kodeverkApi',
  baseQuery,
  endpoints: (builder) => ({
    getKodeverk: builder.query<IKodeverk, void>({
      query: () => '/api/klage-kodeverk-api/kodeverk',
    }),
  }),
});

export const { useGetKodeverkQuery } = kodeverkApi;
