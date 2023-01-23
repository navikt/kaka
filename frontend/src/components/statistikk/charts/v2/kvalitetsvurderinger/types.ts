import { MainReason } from '../../../../../types/kvalitetsvurdering/v2';
import { IFullStatisticVurderingV2 } from '../../../../../types/statistics/v2';

export type MinimalVurdering = Partial<IFullStatisticVurderingV2>;

export interface DataSet {
  label: string;
  data: MinimalVurdering[];
}

export interface MangelfullVurdering {
  [MainReason.Klageforberedelsen]: IFullStatisticVurderingV2['klageforberedelsen'];
  [MainReason.Utredningen]: IFullStatisticVurderingV2['utredningen'];
  [MainReason.Vedtaket]: IFullStatisticVurderingV2['vedtaket'];
  [MainReason.BrukAvRaadgivendeLege]: IFullStatisticVurderingV2['brukAvRaadgivendeLege'];
}
