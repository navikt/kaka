import {
  type ISaksdataBase,
  type ISaksdataComplete,
  type ISaksdataIncomplete,
  KvalitetsvurderingVersion,
} from '@app/types/saksdata';
/* eslint-disable max-lines */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './common';
import { kvalitetsvurderingV1Api } from './kvalitetsvurdering/v1';
import { kvalitetsvurderingV2Api } from './kvalitetsvurdering/v2';

type WithId = Pick<ISaksdataBase, 'id'>;
type Updatable = Omit<ISaksdataIncomplete, 'id' | 'created' | 'modified'>;
type SaksdataUpdate<K extends keyof Updatable> = Pick<Updatable, K> & WithId;
type SaksdataAndListUpdate<K extends keyof Updatable> = SaksdataUpdate<K> & { saksbehandlerIdent: string };

interface ISaksdataListParams {
  saksbehandlerIdent: string;
  sidenDager?: number;
}

export const saksdataApi = createApi({
  reducerPath: 'saksdataApi',
  baseQuery,
  endpoints: (builder) => ({
    createSaksdata: builder.mutation<ISaksdataIncomplete, ISaksdataListParams>({
      query: () => ({
        url: '/api/kaka-api/saksdata',
        method: 'POST',
        body: { kvalitsvurderingVersion: 2 },
      }),
      onQueryStarted: async ({ saksbehandlerIdent, sidenDager }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent, sidenDager }, (draft) => {
            draft.push(data);
          }),
        );
        dispatch(saksdataApi.util.updateQueryData('getSaksdata', data.id, () => data));
      },
    }),
    reopenSaksdata: builder.mutation<ISaksdataIncomplete, { saksbehandlerIdent: string; saksdata: ISaksdataComplete }>({
      query: ({ saksdata }) => ({
        url: `/api/kaka-api/saksdata/${saksdata.id}/reopen`,
        method: 'POST',
      }),
      onQueryStarted: async ({ saksdata, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const getSaksdataPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', saksdata.id, (draft) => {
            draft.avsluttetAvSaksbehandler = null;
          }),
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) => {
            draft.push({ ...saksdata, avsluttetAvSaksbehandler: null });
          }),
        );

        const completeListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getCompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.filter(({ id }) => id !== saksdata.id),
          ),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(saksdataApi.util.updateQueryData('getSaksdata', data.id, () => data));
          dispatch(
            saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
              draft.map((s) => (s.id === data.id ? data : s)),
            ),
          );

          if (data.kvalitetsvurderingReference.version !== saksdata.kvalitetsvurderingReference.version) {
            switch (saksdata.kvalitetsvurderingReference.version) {
              case KvalitetsvurderingVersion.V1:
                kvalitetsvurderingV1Api.util.updateQueryData('getKvalitetsvurdering', data.id, () => undefined);
                break;
              case KvalitetsvurderingVersion.V2:
                kvalitetsvurderingV2Api.util.updateQueryData('getKvalitetsvurdering', data.id, () => undefined);
                break;
            }
          }
        } catch {
          getSaksdataPatchResult.undo();
          incompleteListPatchResult.undo();
          completeListPatchResult.undo();
        }
      },
    }),
    deleteSaksdata: builder.mutation<void, { saksId: string; saksbehandlerIdent: string }>({
      query: ({ saksId }) => ({
        url: `/api/kaka-api/saksdata/${saksId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ saksId, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(saksdataApi.util.updateQueryData('getSaksdata', saksId, () => undefined));
        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.filter(({ id }) => id !== saksId),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    getSaksdata: builder.query<ISaksdataComplete | ISaksdataIncomplete, string>({
      query: (id) => `/api/kaka-api/saksdata/${id}`,
    }),
    getIncompleteSaksdataList: builder.query<ISaksdataIncomplete[], ISaksdataListParams>({
      query: (params) => ({
        url: '/api/kaka-api/saksdataliste',
        params: { ...params, fullfoert: false },
      }),
      transformResponse: ({ searchHits }) => searchHits,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        data.forEach((saksdata) => {
          dispatch(saksdataApi.util.updateQueryData('getSaksdata', saksdata.id, () => saksdata));
        });
      },
    }),
    getCompleteSaksdataList: builder.query<ISaksdataComplete[], ISaksdataListParams>({
      query: (params) => ({
        url: '/api/kaka-api/saksdataliste',
        params: { ...params, fullfoert: true },
      }),
      transformResponse: ({ searchHits }) => searchHits,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        data.forEach((saksdata) => {
          dispatch(saksdataApi.util.updateQueryData('getSaksdata', saksdata.id, () => saksdata));
        });
      },
    }),
    fullfoer: builder.mutation<ISaksdataComplete, { saksdata: ISaksdataIncomplete; saksbehandlerIdent: string }>({
      query: ({ saksdata }) => ({
        url: `/api/kaka-api/saksdata/${saksdata.id}/fullfoer`,
        method: 'POST',
      }),
      onQueryStarted: async ({ saksdata, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.filter(({ id }) => saksdata.id !== id),
          ),
        );

        try {
          const { data } = await queryFulfilled;

          dispatch(
            kvalitetsvurderingV2Api.util.invalidateTags([
              { type: 'kvalitetsvurdering', id: saksdata.kvalitetsvurderingReference.id },
            ]),
          );

          dispatch(
            kvalitetsvurderingV1Api.util.invalidateTags([
              { type: 'kvalitetsvurdering', id: saksdata.kvalitetsvurderingReference.id },
            ]),
          );

          dispatch(
            saksdataApi.util.updateQueryData('getSaksdata', saksdata.id, (draft) => {
              draft.avsluttetAvSaksbehandler = data.avsluttetAvSaksbehandler;
            }),
          );

          dispatch(
            saksdataApi.util.updateQueryData('getCompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
              draft.map((s) => (s.id === saksdata.id ? data : s)),
            ),
          );
        } catch {
          incompleteListPatchResult.undo();
        }
      },
    }),
    setHjemler: builder.mutation<ISaksdataIncomplete, SaksdataAndListUpdate<'hjemmelIdList'>>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/saksdata/${id}/hjemmelidlist`,
        method: 'PUT',
        body: { value: body.hjemmelIdList },
      }),
      onQueryStarted: async ({ id, saksbehandlerIdent, hjemmelIdList }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.hjemmelIdList = hjemmelIdList;
          }),
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, hjemmelIdList } : saksdata)),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setSakenGjelder: builder.mutation<ISaksdataIncomplete, SaksdataAndListUpdate<'sakenGjelder'>>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/saksdata/${id}/sakengjelder`,
        method: 'PUT',
        body: { value: body.sakenGjelder },
      }),
      onQueryStarted: async ({ id, sakenGjelder, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.sakenGjelder = sakenGjelder;
          }),
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, sakenGjelder } : saksdata)),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setMottattKlageinstans: builder.mutation<ISaksdataIncomplete, SaksdataUpdate<'mottattKlageinstans'>>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/saksdata/${id}/mottattklageinstans`,
        method: 'PUT',
        body: { value: body.mottattKlageinstans },
      }),
      onQueryStarted: async ({ id, mottattKlageinstans }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.mottattKlageinstans = mottattKlageinstans;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setMottattVedtaksinstans: builder.mutation<ISaksdataIncomplete, SaksdataUpdate<'mottattVedtaksinstans'>>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/saksdata/${id}/mottattvedtaksinstans`,
        method: 'PUT',
        body: { value: body.mottattVedtaksinstans },
      }),
      onQueryStarted: async ({ id, mottattVedtaksinstans }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.mottattVedtaksinstans = mottattVedtaksinstans;
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    setSakstype: builder.mutation<ISaksdataIncomplete, SaksdataAndListUpdate<'sakstypeId'>>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/saksdata/${id}/sakstype`,
        method: 'PUT',
        body: { value: body.sakstypeId },
      }),
      onQueryStarted: async ({ id, sakstypeId, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.sakstypeId = sakstypeId;
          }),
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, sakstypeId } : saksdata)),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setYtelse: builder.mutation<ISaksdataIncomplete, SaksdataAndListUpdate<'ytelseId'>>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/saksdata/${id}/ytelse`,
        method: 'PUT',
        body: { value: body.ytelseId },
      }),
      onQueryStarted: async ({ id, ytelseId, saksbehandlerIdent }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.ytelseId = ytelseId;
            draft.hjemmelIdList = [];
          }),
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, ytelseId } : saksdata)),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setUtfall: builder.mutation<ISaksdataIncomplete, SaksdataAndListUpdate<'utfallId'>>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/saksdata/${id}/utfall`,
        method: 'PUT',
        body: { value: body.utfallId },
      }),
      onQueryStarted: async ({ id, saksbehandlerIdent, utfallId }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.utfallId = utfallId;
          }),
        );

        const incompleteListPatchResult = dispatch(
          saksdataApi.util.updateQueryData('getIncompleteSaksdataList', { saksbehandlerIdent }, (draft) =>
            draft.map((saksdata) => (saksdata.id === id ? { ...saksdata, utfallId } : saksdata)),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          incompleteListPatchResult.undo();
        }
      },
    }),
    setVedtaksinstansenhet: builder.mutation<ISaksdataIncomplete, SaksdataUpdate<'vedtaksinstansEnhet'>>({
      query: ({ id, ...body }) => ({
        url: `/api/kaka-api/saksdata/${id}/vedtaksinstansenhet`,
        method: 'PUT',
        body: { value: body.vedtaksinstansEnhet },
      }),
      onQueryStarted: async ({ id, vedtaksinstansEnhet }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          saksdataApi.util.updateQueryData('getSaksdata', id, (draft) => {
            draft.vedtaksinstansEnhet = vedtaksinstansEnhet;
          }),
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
  useReopenSaksdataMutation,
} = saksdataApi;
