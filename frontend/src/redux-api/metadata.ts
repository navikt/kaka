import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../types/user';
import { baseQuery } from './common';

export const metadataApi = createApi({
  reducerPath: 'metadataApi',
  baseQuery,
  endpoints: (builder) => ({
    getUserData: builder.query<IUser, void>({
      query: () => '/api/kaka-api/metadata/userdata',
    }),
  }),
});

export const { useGetUserDataQuery } = metadataApi;
