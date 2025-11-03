import type { KvalitetsvurderingDataV3 } from '@app/types/kvalitetsvurdering/v3';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../common';

type Argument = Partial<KvalitetsvurderingDataV3> & { id: string };

export const kvalitetsvurderingV3Api = createApi({
  reducerPath: 'kvalitetsvurderingV3Api',
  baseQuery,
  tagTypes: ['kvalitetsvurdering'],
  endpoints: (builder) => ({
    getKvalitetsvurdering: builder.query<KvalitetsvurderingDataV3, string>({
      query: (id) => `/api/kaka-api/kvalitetsvurderinger/v3/${id}`,
      providesTags: (_, __, id) => [{ type: 'kvalitetsvurdering', id }],
    }),
    getCensoredKvalitetsvurdering: builder.query<KvalitetsvurderingDataV3, string>({
      query: (id) => `/api/kaka-api/censoredkvalitetsvurderinger/v3/${id}`,
    }),
    updateKvalitetsvurdering: builder.mutation<KvalitetsvurderingDataV3, Argument>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/kvalitetsvurderinger/v3/${id}`,
        method: 'PATCH',
        body,
      }),
      onQueryStarted: async ({ id, ...update }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          kvalitetsvurderingV3Api.util.updateQueryData('getKvalitetsvurdering', id, (draft) => ({
            ...draft,
            ...update,
          })),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetKvalitetsvurderingQuery,
  useUpdateKvalitetsvurderingMutation,
  useGetCensoredKvalitetsvurderingQuery,
} = kvalitetsvurderingV3Api;
