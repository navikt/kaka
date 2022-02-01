import { createApi } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { IManagerStatisticsQuery, ISaksbehandler, IStatistics, IStatisticsQuery } from '../types/statistics';
import { baseQuery } from './common';

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery,
  endpoints: (builder) => ({
    getTotalStatistics: builder.query<IStatistics, IStatisticsQuery>({
      query: (params) => {
        const query = qs.stringify(params);

        return `/api/kaka-api/statistics/total?${query}`;
      },
    }),
    getManagerStatistics: builder.query<IStatistics, IManagerStatisticsQuery>({
      query: ({ enhetId, ...params }) => {
        const query = qs.stringify(params, { arrayFormat: 'comma' });
        return `/api/kaka-api/statistics/enheter/${enhetId}/manager?${query}`;
      },
    }),
    getSaksbehandlere: builder.query<ISaksbehandler[], string>({
      query: (enhetId) => `/api/kaka-api/enheter/${enhetId}/saksbehandlere`,
    }),
  }),
});

export const { useGetTotalStatisticsQuery, useGetManagerStatisticsQuery, useGetSaksbehandlereQuery } = statisticsApi;
