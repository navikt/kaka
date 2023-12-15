import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/query';
import { useSaksdata } from '@app/hooks/use-saksdata';
import {
  useGetCensoredKvalitetsvurderingQuery,
  useGetKvalitetsvurderingQuery,
  useUpdateKvalitetsvurderingMutation,
} from '@app/redux-api/kvalitetsvurdering/v2';
import { useKlageenheter } from '@app/simple-api-state/use-kodeverk';
import { useUser } from '@app/simple-api-state/use-user';
import { IKvalitetsvurderingData } from '@app/types/kvalitetsvurdering/v2';
import { ISaksdataComplete, ISaksdataIncomplete } from '@app/types/saksdata';

interface UpdateStatus {
  isLoading: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

interface Loading {
  saksdata: undefined;
  hjemler: string[];
  kvalitetsvurdering: undefined;
  update: undefined;
  isLoading: true;
  updateStatus: UpdateStatus;
}

interface Loaded {
  saksdata: ISaksdataIncomplete | ISaksdataComplete;
  hjemler: string[];
  kvalitetsvurdering: IKvalitetsvurderingData;
  update: (patch: Partial<IKvalitetsvurderingData>) => Promise<IKvalitetsvurderingData>;
  isLoading: false;
  updateStatus: UpdateStatus;
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
  const [update, updateStatus] = useUpdateKvalitetsvurderingMutation();

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
      updateStatus,
    };
  }

  return {
    saksdata,
    hjemler: saksdata.hjemmelIdList,
    kvalitetsvurdering,
    update: (patch) => update({ ...patch, id: saksdata.kvalitetsvurderingReference.id }).unwrap(),
    isLoading: false,
    updateStatus,
  };
};
