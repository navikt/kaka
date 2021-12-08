import { createApi } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { ISaksdata, ISaksdataBase } from '../types/saksdata';
import { baseQuery } from './common';

type WithId = Pick<ISaksdata, 'id'>;
type Updatable = Omit<ISaksdata, 'id' | 'created' | 'modified'>;
type SaksdataUpdate<K extends keyof Updatable> = Pick<Updatable, K> & WithId;
type SaksdataAndListUpdate<K extends keyof Updatable> = SaksdataUpdate<K> & { saksbehandlerIdent: string };

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
        const { data } = await queryFulfilled;
        dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', query, (draft) => {
            draft.push(data);
          })
        );
        dispatch(saksdataApi.util.updateQueryData('getSaksdata', data.id, () => data));
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
          completeListPatchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setHjemler: builder.mutation<ISaksdata, SaksdataAndListUpdate<'hjemmelIdList'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/hjemmelidlist`,
        method: 'PUT',
        body: {
          value: body.hjemmelIdList,
        },
      }),
      onQueryStarted: async ({ id, saksbehandlerIdent, hjemmelIdList }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.hjemmelIdList = hjemmelIdList;
          })
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, hjemmelIdList } : saksdata))
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setSakenGjelder: builder.mutation<ISaksdata, SaksdataAndListUpdate<'sakenGjelder'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/sakengjelder`,
        method: 'PUT',
        body: {
          value: body.sakenGjelder,
        },
      }),
      onQueryStarted: async ({ id, sakenGjelder, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.sakenGjelder = sakenGjelder;
          })
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, sakenGjelder } : saksdata))
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
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
    setSakstype: builder.mutation<ISaksdata, SaksdataAndListUpdate<'sakstypeId'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/sakstype`,
        method: 'PUT',
        body: {
          value: body.sakstypeId,
        },
      }),
      onQueryStarted: async ({ id, sakstypeId, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.sakstypeId = sakstypeId;
          })
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, sakstypeId } : saksdata))
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setYtelse: builder.mutation<ISaksdata, SaksdataAndListUpdate<'ytelseId'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/ytelse`,
        method: 'PUT',
        body: {
          value: body.ytelseId,
        },
      }),
      onQueryStarted: async ({ id, ytelseId: ytelse, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.ytelseId = ytelse;
          })
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, ytelseId: ytelse } : saksdata))
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setUtfall: builder.mutation<ISaksdata, SaksdataAndListUpdate<'utfallId'>>({
      query: ({ id, ...body }) => ({
        url: `/saksdata/${id}/utfall`,
        method: 'PUT',
        body: {
          value: body.utfallId,
        },
      }),
      onQueryStarted: async ({ id, saksbehandlerIdent, utfallId }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.utfallId = utfallId;
          })
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, utfallId } : saksdata))
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
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
  useSetYtelseMutation,
  useSetUtfallMutation,
  useSetVedtaksinstansenhetMutation,
  useDeleteSaksdataMutation,
} = saksdataApi;
