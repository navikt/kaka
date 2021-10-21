import { createApi } from '@reduxjs/toolkit/query/react';
import { staggeredBaseQuery } from './common';

export const kvalitetsvurderingerApi = createApi({
  reducerPath: 'kvalitetsvurderingerApi',
  baseQuery: staggeredBaseQuery,
  endpoints: () => ({}),
});
