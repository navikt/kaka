import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { IStatisticVurderingV2 } from '@app/types/statistics/v2';

export interface DataSet {
  label: string;
  data: IStatisticVurderingV2[];
}

export interface MainReasonDataset {
  label: string;
  data: MainReasonsVurdering[];
}

interface MainReasonsVurdering {
  [MainReason.Klageforberedelsen]: IStatisticVurderingV2[MainReason.Klageforberedelsen];
  [MainReason.Utredningen]: IStatisticVurderingV2[MainReason.Utredningen];
  [MainReason.Vedtaket]: IStatisticVurderingV2[MainReason.Vedtaket];
  [MainReason.BrukAvRaadgivendeLege]: IStatisticVurderingV2[MainReason.BrukAvRaadgivendeLege];
}
