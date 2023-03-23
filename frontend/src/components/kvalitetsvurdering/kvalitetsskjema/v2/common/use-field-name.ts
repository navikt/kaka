import { KVALITETSVURDERING_V2_TEXTS } from '@app/types/kvalitetsvurdering/texts/structures';
import { IKvalitetsvurderingData } from '@app/types/kvalitetsvurdering/v2';

type Keys = keyof IKvalitetsvurderingData;

export const useKvalitetsvurderingV2FieldName = (field: Keys): string => KVALITETSVURDERING_V2_TEXTS[field].label;
