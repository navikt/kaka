import { createApi } from '@reduxjs/toolkit/query/react';
import { IKvalitetsvurdering, IKvalitetsvurderingData } from '../../types/kvalitetsvurdering/v2';
import { baseQuery } from '../common';

type Argument = Partial<IKvalitetsvurderingData> & Pick<IKvalitetsvurdering, 'id'>;

export const kvalitetsvurderingV2Api = createApi({
  reducerPath: 'kvalitetsvurderingV2Api',
  baseQuery,
  endpoints: (builder) => ({
    getKvalitetsvurdering: builder.query<IKvalitetsvurdering, string>({
      query: (id) => `/api/kaka-api/kvalitetsvurdering/v2/${id}`,
    }),
    updateKvalitetsvurdering: builder.mutation<IKvalitetsvurdering, Argument>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/kvalitetsvurdering/v2/${id}/`,
        method: 'PATCH',
        body,
      }),
      onQueryStarted: async ({ id, ...update }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          kvalitetsvurderingV2Api.util.updateQueryData('getKvalitetsvurdering', id, (draft) => ({
            ...draft,
            ...update,
          }))
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            kvalitetsvurderingV2Api.util.updateQueryData('getKvalitetsvurdering', id, (draft) => {
              draft.modified = data.modified;
            })
          );
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetKvalitetsvurderingQuery, useUpdateKvalitetsvurderingMutation } = kvalitetsvurderingV2Api;
