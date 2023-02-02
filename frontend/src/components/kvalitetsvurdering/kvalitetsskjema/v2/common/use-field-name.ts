import { KVALITETSVURDERING_V2_TEXTS } from '../../../../../types/kvalitetsvurdering/texts/structures';
import { IKvalitetsvurderingData } from '../../../../../types/kvalitetsvurdering/v2';

type Keys = keyof IKvalitetsvurderingData;

export const useKvalitetsvurderingV2FieldName = (field: Keys): string => KVALITETSVURDERING_V2_TEXTS[field].label;
