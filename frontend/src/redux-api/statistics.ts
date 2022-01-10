import { createApi } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { IStatistics, IStatisticsQuery } from '../types/statistics';
import { baseQuery } from './common';

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery,
  endpoints: (builder) => ({
    getStatistics: builder.query<IStatistics, IStatisticsQuery>({
      query: (params) => {
        const query = qs.stringify(params);

        return `/api/kaka-api/export/raw?${query}`;
      },
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
