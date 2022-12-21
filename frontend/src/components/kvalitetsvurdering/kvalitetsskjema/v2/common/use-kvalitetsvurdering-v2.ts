import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useSaksdata } from '../../../../../hooks/use-saksdata';
import {
  useGetCensoredKvalitetsvurderingQuery,
  useGetKvalitetsvurderingQuery,
  useUpdateKvalitetsvurderingMutation,
} from '../../../../../redux-api/kvalitetsvurdering/v2';
import { useKlageenheter } from '../../../../../simple-api-state/use-kodeverk';
import { useUser } from '../../../../../simple-api-state/use-user';
import { IKvalitetsvurdering, IKvalitetsvurderingData } from '../../../../../types/kvalitetsvurdering/v2';
import { ISaksdataComplete, ISaksdataIncomplete } from '../../../../../types/saksdata';

interface Loading {
  saksdata: undefined;
  hjemler: string[];
  kvalitetsvurdering: undefined;
  update: undefined;
  isLoading: true;
  isUpdating: false;
}

interface Loaded {
  saksdata: ISaksdataIncomplete | ISaksdataComplete;
  hjemler: string[];
  kvalitetsvurdering: IKvalitetsvurdering;
  update: (patch: Partial<IKvalitetsvurderingData>) => Promise<IKvalitetsvurdering>;
  isLoading: false;
  isUpdating: boolean;
}

const EMPTY_ARRAY: string[] = [];

const useKvalitetsvurderingHook = ():
  | typeof useGetKvalitetsvurderingQuery
  | typeof useGetCensoredKvalitetsvurderingQuery => {
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data: klageenheter, isLoading: klageenheterIsLoading } = useKlageenheter();

  if (userIsLoading || klageenheterIsLoading || typeof user === 'undefined' || typeof klageenheter === 'undefined') {
    return useGetCensoredKvalitetsvurderingQuery;
  }

  return klageenheter.some(({ id }) => id === user.ansattEnhet.id)
    ? useGetKvalitetsvurderingQuery
    : useGetCensoredKvalitetsvurderingQuery;
};

export const useKvalitetsvurderingV2 = (): Loading | Loaded => {
  const { data: saksdata, isLoading: saksdataIsLoading } = useSaksdata();
  const param = typeof saksdata === 'undefined' ? skipToken : saksdata.kvalitetsvurderingReference.id;
  const useGetKvalitetsvurdering = useKvalitetsvurderingHook();
  const { data: kvalitetsvurdering, isLoading: kvalitetsvurderingIsLoading } = useGetKvalitetsvurdering(param);
  const [update, { isLoading: updateIsLoading }] = useUpdateKvalitetsvurderingMutation();

  if (
    saksdataIsLoading ||
    kvalitetsvurderingIsLoading ||
    typeof saksdata === 'undefined' ||
    typeof kvalitetsvurdering === 'undefined'
  ) {
    return {
      saksdata: undefined,
      hjemler: EMPTY_ARRAY,
      kvalitetsvurdering: undefined,
      update: undefined,
      isLoading: true,
      isUpdating: false,
    };
  }

  return {
    saksdata,
    hjemler: saksdata.hjemmelIdList,
    kvalitetsvurdering,
    update: (patch) => update({ ...patch, id: saksdata.kvalitetsvurderingReference.id }).unwrap(),
    isLoading: false,
    isUpdating: updateIsLoading,
  };
};
