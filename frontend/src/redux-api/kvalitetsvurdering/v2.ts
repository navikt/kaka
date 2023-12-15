import { createApi } from '@reduxjs/toolkit/query/react';
import { IKvalitetsvurderingData } from '@app/types/kvalitetsvurdering/v2';
import { baseQuery } from '../common';

type Argument = Partial<IKvalitetsvurderingData> & { id: string };

export const kvalitetsvurderingV2Api = createApi({
  reducerPath: 'kvalitetsvurderingV2Api',
  baseQuery,
  tagTypes: ['kvalitetsvurdering'],
  endpoints: (builder) => ({
    getKvalitetsvurdering: builder.query<IKvalitetsvurderingData, string>({
      query: (id) => `/api/kaka-api/kvalitetsvurderinger/v2/${id}`,
      providesTags: (_, __, id) => [{ type: 'kvalitetsvurdering', id }],
    }),
    getCensoredKvalitetsvurdering: builder.query<IKvalitetsvurderingData, string>({
      query: (id) => `/api/kaka-api/censoredkvalitetsvurderinger/v2/${id}`,
    }),
    updateKvalitetsvurdering: builder.mutation<IKvalitetsvurderingData, Argument>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/kvalitetsvurderinger/v2/${id}`,
        method: 'PATCH',
        body,
      }),
      onQueryStarted: async ({ id, ...update }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          kvalitetsvurderingV2Api.util.updateQueryData('getKvalitetsvurdering', id, (draft) => ({
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
} = kvalitetsvurderingV2Api;
