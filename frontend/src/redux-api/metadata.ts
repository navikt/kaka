import { createApi } from '@reduxjs/toolkit/query/react';
import { IKodeverk } from '../types/kodeverk';
import { IUser } from '../types/user';
import { baseQuery } from './common';

export const metadataApi = createApi({
  reducerPath: 'metadataApi',
  baseQuery,
  endpoints: (builder) => ({
    getKodeverk: builder.query<IKodeverk, void>({
      query: () => '/metadata/kodeverk',
    }),
    getUserData: builder.query<IUser, void>({
      query: () => '/metadata/userdata',
    }),
  }),
});

export const { useGetKodeverkQuery, useGetUserDataQuery } = metadataApi;
