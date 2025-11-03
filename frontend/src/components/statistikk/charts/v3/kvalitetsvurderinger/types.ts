import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import type { IStatisticVurderingV3 } from '@app/types/statistics/v3';

export interface DataSetV3 {
  label: string;
  data: IStatisticVurderingV3[];
}

export interface MainReasonV3Dataset {
  label: string;
  data: MainReasonsVurdering[];
}

interface MainReasonsVurdering {
  [MainReason.Særregelverket]: IStatisticVurderingV3[MainReason.Særregelverket];
  [MainReason.Saksbehandlingsreglene]: IStatisticVurderingV3[MainReason.Saksbehandlingsreglene];
  [MainReason.Trygdemedisin]: IStatisticVurderingV3[MainReason.Trygdemedisin];
}
