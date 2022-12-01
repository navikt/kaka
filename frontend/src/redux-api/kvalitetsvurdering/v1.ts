import { createApi } from '@reduxjs/toolkit/query/react';
import {
  IKvalitetsvurderingBooleans,
  IKvalitetsvurderingRadio,
  IKvalitetsvurderingRadioExtended,
  IKvalitetsvurderingTexts,
  IKvalitetsvurderingV1,
} from '../../types/kvalitetsvurdering/v1';
import { baseQuery } from '../common';

type WithId = Pick<IKvalitetsvurderingV1, 'id'>;

type UpdateBoolean = Partial<IKvalitetsvurderingBooleans> & WithId;
type UpdateText = Partial<IKvalitetsvurderingTexts> & WithId;
type UpdateRadio = Partial<IKvalitetsvurderingRadio> & WithId;
type UpdateRadioExtended = Partial<IKvalitetsvurderingRadioExtended> & WithId;

export const kvalitetsvurderingV1Api = createApi({
  reducerPath: 'kvalitetsvurderingV1Api',
  baseQuery,
  endpoints: (builder) => ({
    getKvalitetsvurdering: builder.query<IKvalitetsvurderingV1, string>({
      query: (id) => `/api/kaka-api/kvalitetsvurdering/${id}`,
    }),
    updateKvalitetsvurdering: builder.mutation<
      IKvalitetsvurderingV1,
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
          kvalitetsvurderingV1Api.util.updateQueryData('getKvalitetsvurdering', id, (draft) =>
            Object.assign(draft, update)
          )
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            kvalitetsvurderingV1Api.util.updateQueryData('getKvalitetsvurdering', id, (draft) => {
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

export const { useGetKvalitetsvurderingQuery, useUpdateKvalitetsvurderingMutation } = kvalitetsvurderingV1Api;
