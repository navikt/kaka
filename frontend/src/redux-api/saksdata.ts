import { createApi } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { ISaksdata, ISaksdataBase } from '../types/saksdata';
import { baseQuery } from './common';

type WithId = Pick<ISaksdata, 'id'>;
type Updatable = Omit<ISaksdata, 'id' | 'created' | 'modified'>;
type SaksdataUpdate<K extends keyof Updatable> = Pick<Updatable, K> & WithId;

export interface ISaksdataListParams {
  saksbehandlerIdent: string;
  sidenDager?: number;
}

export const saksdataApi = createApi({
  reducerPath: 'saksdataApi',
  baseQuery,
  endpoints: (builder) => ({
    createSaksdata: builder.mutation<ISaksdata, ISaksdataListParams>({
      query: () => ({
        url: '/saksdata',
        method: 'POST',
      }),
      onQueryStarted: async (query, { dispatch, queryFulfilled }) => {
        const now = new Date().toISOString();
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', query, (draft) => {
            draft.push({
              avsluttetAvSaksbehandler: null,
              created: now,
              hjemler: [],
              id: now,
              modified: now,
              sakstype: null,
              tema: null,
              utfall: null,
              sakenGjelder: null,
            });
          })
        );

        try {
          const { data: sak } = await queryFulfilled;
          dispatch(
            saksdataApi.util.updateQueryData('getIncompleteSaksdataList', query, (draft) =>
              draft.map((s) => (s.id === now ? sak : s))
            )
          );
          dispatch(saksdataApi.util.updateQueryData('getSaksdata', sak.id, () => sak));
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteSaksdata: builder.mutation<void, { saksId: string; saksbehandlerIdent: string }>({
      query: ({ saksId }) => ({
        url: `/saksdata/${saksId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ saksId, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(saksdataApi.util.updateQueryData('getSaksdata', saksId, () => undefined));
        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.filter(({ id }) => id !== saksId)
          )
        );

        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    getSaksdata: builder.query<ISaksdata, string>({
      query: (id) => `/saksdata/${id}`,
    }),
    getIncompleteSaksdataList: builder.query<ISaksdataBase[], ISaksdataListParams>({
      query: (params) => {
        const query = qs.stringify(params);
        return `/saksdataliste/?fullfoert=false&${query}`;
      },
      transformResponse: ({ searchHits }) => searchHits,
    }),
    getCompleteSaksdataList: builder.query<ISaksdataBase[], ISaksdataListParams>({
      query: (params) => {
        const query = qs.stringify(params);
        return `/saksdataliste/?fullfoert=true&${query}`;
      },
      transformResponse: ({ searchHits }) => searchHits,
    }),
    fullfoer: builder.mutation<ISaksdata, { saksdata: ISaksdata; saksbehandlerIdent: string }>({
      query: ({ saksdata }) => ({
        url: `/saksdata/${saksdata.id}/fullfoer`,
        method: 'POST',
      }),
      onQueryStarted: async ({ saksdata, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', saksdata.id, (draft) => {
            draft.avsluttetAvSaksbehandler = new Date().toISOString();
          })
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.filter(({ id }) => saksdata.id !== id)
          )
        );

        const completeListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getCompleteSaksdataList', { saksbehandlerIdent }, (draft) => {
            draft.push(saksdata);
          })
        );

        try {
          const { data } = await queryFulfilled;

          dispatch(
            saksdataApi.util.updateQueryData('getSaksdata', saksdata.id, (draft) => {
              draft.avsluttetAvSaksbehandler = data.avsluttetAvSaksbehandler;
            })
          );
          dispatch(
            saksdataApi.util.updateQueryData('getCompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
              draft.map((s) => (s.id === saksdata.id ? data : s))
            )
          );
        } catch {
          patchResult.undo();
          completeListPatchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setHjemler: builder.mutation<ISaksdata, SaksdataUpdate<'hjemler'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/hjemler`,
        method: 'PUT',
        body: {
          value: body.hjemler,
        },
      }),
      onQueryStarted: async ({ id, hjemler }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.hjemler = hjemler;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setSakenGjelder: builder.mutation<ISaksdata, SaksdataUpdate<'sakenGjelder'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/sakengjelder`,
        method: 'PUT',
        body: {
          value: body.sakenGjelder,
        },
      }),
      onQueryStarted: async ({ id, sakenGjelder }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.sakenGjelder = sakenGjelder;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setMottattKlageinstans: builder.mutation<ISaksdata, SaksdataUpdate<'mottattKlageinstans'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/mottattklageinstans`,
        method: 'PUT',
        body: {
          value: body.mottattKlageinstans,
        },
      }),
      onQueryStarted: async ({ id, mottattKlageinstans }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.mottattKlageinstans = mottattKlageinstans;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setMottattVedtaksinstans: builder.mutation<ISaksdata, SaksdataUpdate<'mottattVedtaksinstans'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/mottattvedtaksinstans`,
        method: 'PUT',
        body: {
          value: body.mottattVedtaksinstans,
        },
      }),
      onQueryStarted: async ({ id, mottattVedtaksinstans }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.mottattVedtaksinstans = mottattVedtaksinstans;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setSakstype: builder.mutation<ISaksdata, SaksdataUpdate<'sakstype'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/sakstype`,
        method: 'PUT',
        body: {
          value: body.sakstype,
        },
      }),
      onQueryStarted: async ({ id, sakstype }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.sakstype = sakstype;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setTema: builder.mutation<ISaksdata, SaksdataUpdate<'tema'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/tema`,
        method: 'PUT',
        body: {
          value: body.tema,
        },
      }),
      onQueryStarted: async ({ id, tema }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.tema = tema;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setUtfall: builder.mutation<ISaksdata, SaksdataUpdate<'utfall'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/utfall`,
        method: 'PUT',
        body: {
          value: body.utfall,
        },
      }),
      onQueryStarted: async ({ id, utfall }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.utfall = utfall;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setVedtaksinstansenhet: builder.mutation<ISaksdata, SaksdataUpdate<'vedtaksinstansEnhet'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/vedtaksinstansenhet`,
        method: 'PUT',
        body: {
          value: body.vedtaksinstansEnhet,
        },
      }),
      onQueryStarted: async ({ id, vedtaksinstansEnhet }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.vedtaksinstansEnhet = vedtaksinstansEnhet;
          })
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
  useCreateSaksdataMutation,
  useFullfoerMutation,
  useGetSaksdataQuery,
  useGetCompleteSaksdataListQuery,
  useGetIncompleteSaksdataListQuery,
  useSetHjemlerMutation,
  useSetSakenGjelderMutation,
  useSetMottattKlageinstansMutation,
  useSetMottattVedtaksinstansMutation,
  useSetSakstypeMutation,
  useSetTemaMutation,
  useSetUtfallMutation,
  useSetVedtaksinstansenhetMutation,
  useDeleteSaksdataMutation,
} = saksdataApi;
