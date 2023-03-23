import { MainReason } from '../../../../../types/kvalitetsvurdering/v2';
import { IStatisticVurderingV2 } from '../../../../../types/statistics/v2';

export interface DataSet {
  label: string;
  data: IStatisticVurderingV2[];
}

export interface MainReasonsVurdering {
  [MainReason.Klageforberedelsen]: IStatisticVurderingV2[MainReason.Klageforberedelsen];
  [MainReason.Utredningen]: IStatisticVurderingV2[MainReason.Utredningen];
  [MainReason.Vedtaket]: IStatisticVurderingV2[MainReason.Vedtaket];
  [MainReason.BrukAvRaadgivendeLege]: IStatisticVurderingV2[MainReason.BrukAvRaadgivendeLege];
}
