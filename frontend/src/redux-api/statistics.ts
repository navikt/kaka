import { createApi } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { ISaksdatalisteLederVedtaksinstans, ISaksdatalisteLederVedtaksinstansParams } from '../types/saksdata';
import {
  IManagerStatisticsQuery,
  ISaksbehandler,
  IStatistics,
  IStatisticsQuery,
  ITotalStatistics,
  IVedtaksinstanslederQuery,
} from '../types/statistics';
import { baseQuery } from './common';

export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  baseQuery,
  endpoints: (builder) => ({
    getOpenStatistics: builder.query<IStatistics, IStatisticsQuery>({
      query: (params) => {
        const query = qs.stringify(params, { arrayFormat: 'comma', skipNulls: true });

        return `/api/kaka-api/statistics/open?${query}`;
      },
    }),
    getTotalStatistics: builder.query<ITotalStatistics, IStatisticsQuery>({
      query: (params) => {
        const query = qs.stringify(params, { arrayFormat: 'comma', skipNulls: true });

        return `/api/kaka-api/statistics/total?${query}`;
      },
    }),
    getManagerStatistics: builder.query<ITotalStatistics, IManagerStatisticsQuery>({
      query: ({ enhetId, ...params }) => {
        const query = qs.stringify(params, { arrayFormat: 'comma', skipNulls: true });
        return `/api/kaka-api/statistics/enheter/${enhetId}/manager?${query}`;
      },
    }),
    getVedtaksinstanslederStatistics: builder.query<IStatistics, IVedtaksinstanslederQuery>({
      query: (params) => {
        const query = qs.stringify(params, { arrayFormat: 'comma', skipNulls: true });
        return `/api/kaka-api/statistics/vedtaksinstansleder?${query}`;
      },
    }),
    getSaksbehandlere: builder.query<ISaksbehandler[], string>({
      query: (enhetId) => `/api/kaka-api/enheter/${enhetId}/saksbehandlere`,
    }),
    getSaksdatalisteLederVedtaksinstans: builder.query<
      ISaksdatalisteLederVedtaksinstans,
      ISaksdatalisteLederVedtaksinstansParams
    >({
      query: (params) => {
        const query = qs.stringify(params, { arrayFormat: 'comma', skipNulls: true, encode: false });
        return `/api/kaka-api/saksdatalisteledervedtaksinstans?${query}`;
      },
    }),
  }),
});

export const {
  useGetManagerStatisticsQuery,
  useGetOpenStatisticsQuery,
  useGetSaksbehandlereQuery,
  useGetSaksdatalisteLederVedtaksinstansQuery,
  useGetTotalStatisticsQuery,
  useGetVedtaksinstanslederStatisticsQuery,
} = statisticsApi;
