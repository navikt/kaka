import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IKvalitetsvurdering,
  IKvalitetsvurderingBooleans,
  IKvalitetsvurderingRadio,
  IKvalitetsvurderingRadioExtended,
  IKvalitetsvurderingTexts,
} from '../types/kvalitetsvurdering';
import { baseQuery } from './common';

type WithId = Pick<IKvalitetsvurdering, 'id'>;

export type UpdateBoolean = Partial<IKvalitetsvurderingBooleans> & WithId;
export type UpdateText = Partial<IKvalitetsvurderingTexts> & WithId;
export type UpdateRadio = Partial<IKvalitetsvurderingRadio> & WithId;
export type UpdateRadioExtended = Partial<IKvalitetsvurderingRadioExtended> & WithId;

export const kvalitetsvurderingApi = createApi({
  reducerPath: 'kvalitetsvurderingApi',
  baseQuery,
  endpoints: (builder) => ({
    getKvalitetsvurdering: builder.query<IKvalitetsvurdering, string>({
      query: (id) => `/api/kaka-api/kvalitetsvurdering/${id}`,
    }),
    updateKvalitetsvurdering: builder.mutation<
      IKvalitetsvurdering,
      UpdateBoolean | UpdateText | UpdateRadio | UpdateRadioExtended
    >({
      query: ({ id, ...body }) => {
        const [first, ...rest]: [string, unknown][] = Object.entries(body);

        if (rest.length !== 0) {
          throw new Error('Only one value allowed');
        }

        if (first === undefined) {
          throw new Error('No values provided');
        }

        const [key, value] = first;

        return {
          url: `/api/kaka-api/kvalitetsvurdering/${id}/${key.toLowerCase()}`,
          method: 'PUT',
          body: { value },
        };
      },
      onQueryStarted: async ({ id, ...update }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          kvalitetsvurderingApi.util.updateQueryData('getKvalitetsvurdering', id, (draft) =>
            Object.assign(draft, update)
          )
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            kvalitetsvurderingApi.util.updateQueryData('getKvalitetsvurdering', id, (draft) => {
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

export const { useGetKvalitetsvurderingQuery, useUpdateKvalitetsvurderingMutation } = kvalitetsvurderingApi;
