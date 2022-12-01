import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useSaksdata } from '../../../../hooks/use-saksdata';
import {
  useGetKvalitetsvurderingQuery,
  useUpdateKvalitetsvurderingMutation,
} from '../../../../redux-api/kvalitetsvurdering/v2';
import { IKvalitetsvurdering, IKvalitetsvurderingData } from '../../../../types/kvalitetsvurdering/v2';
import { ISaksdataComplete, ISaksdataIncomplete } from '../../../../types/saksdata';

interface Loading {
  saksdata: undefined;
  kvalitetsvurdering: undefined;
  update: undefined;
  isLoading: true;
  isUpdating: false;
}

interface Loaded {
  saksdata: ISaksdataIncomplete | ISaksdataComplete;
  kvalitetsvurdering: IKvalitetsvurdering;
  update: (patch: Partial<IKvalitetsvurderingData>) => Promise<IKvalitetsvurdering>;
  isLoading: false;
  isUpdating: boolean;
}

export const useKvalitetsvurderingV2 = (): Loading | Loaded => {
  const { data: saksdata, isLoading: saksdataIsLoading } = useSaksdata();
  const param = typeof saksdata === 'undefined' ? skipToken : saksdata.kvalitetsvurderingReference.id;
  const { data: kvalitetsvurdering, isLoading: kvalitetsvurderingIsLoading } = useGetKvalitetsvurderingQuery(param);
  const [update, { isLoading: updateIsLoading }] = useUpdateKvalitetsvurderingMutation();

  if (
    saksdataIsLoading ||
    kvalitetsvurderingIsLoading ||
    typeof saksdata === 'undefined' ||
    typeof kvalitetsvurdering === 'undefined'
  ) {
    return {
      saksdata: undefined,
      kvalitetsvurdering: undefined,
      update: undefined,
      isLoading: true,
      isUpdating: false,
    };
  }

  return {
    saksdata,
    kvalitetsvurdering,
    update: (patch) => update({ ...patch, id: saksdata.kvalitetsvurderingReference.id }).unwrap(),
    isLoading: false,
    isUpdating: updateIsLoading,
  };
};
