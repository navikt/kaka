import { KVALITETSVURDERING_V2_TEXTS } from '../../../../../types/kvalitetsvurdering/texts/structures';
import { IKvalitetsvurderingData } from '../../../../../types/kvalitetsvurdering/v2';

type Keys = keyof IKvalitetsvurderingData;

export const KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES = {
  klageforberedelsenGroup: 'Mangelfull klageforberedelse',
  utredningenGroup: 'Mangelfull utredning',
  vedtaketGroup: 'Mangelfullt vedtak',
  raadgivendeLegeGroup: 'Mangelfull bruk av rådgivende lege',
};

export const useKvalitetsvurderingV2FieldName = (field: Keys): string => KVALITETSVURDERING_V2_TEXTS[field].label;
