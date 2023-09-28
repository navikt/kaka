import { KVALITETESVURDERING_V1_FIELD_NAMES as KVALITETSVURDERING_V1_FIELD_NAMES } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v1/use-field-name';
import { KVALITETSVURDERING_V2_TEXTS } from '@app/types/kvalitetsvurdering/texts/structures';
import { KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES } from '@app/types/kvalitetsvurdering/v2';
import { ISaksdataComplete } from '@app/types/saksdata';

type SaksdataKeys = keyof Pick<
  ISaksdataComplete,
  | 'utfallId'
  | 'sakenGjelder'
  | 'sakstypeId'
  | 'ytelseId'
  | 'hjemmelIdList'
  | 'mottattVedtaksinstans'
  | 'mottattKlageinstans'
  | 'vedtaksinstansEnhet'
>;

export const SAKSDATA_FIELD_NAMES: Record<SaksdataKeys, string> = {
  utfallId: 'Utfall/resultat',
  sakenGjelder: 'Saken gjelder',
  sakstypeId: 'Sakstype',
  ytelseId: 'Ytelse',
  hjemmelIdList: 'Lovhjemmel',
  mottattVedtaksinstans: 'Mottatt vedtaksinstans',
  mottattKlageinstans: 'Mottatt klageinstans',
  vedtaksinstansEnhet: 'Fra vedtaksenhet',
};

type Field =
  | keyof typeof KVALITETSVURDERING_V2_TEXTS
  | keyof typeof KVALITETSVURDERING_V1_FIELD_NAMES
  | keyof typeof KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES
  | SaksdataKeys;

const isSaksdataKey = (field: Field): field is SaksdataKeys => field in SAKSDATA_FIELD_NAMES;

const isKvalitetsvurderingV2TextKey = (field: Field): field is keyof typeof KVALITETSVURDERING_V2_TEXTS =>
  field in KVALITETSVURDERING_V2_TEXTS;

const isKvalitetsvurderingV2CheckboxGroupKey = (
  field: Field,
): field is keyof typeof KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES =>
  field in KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES;

const isKvalitetsvurderingV1Key = (field: Field): field is keyof typeof KVALITETSVURDERING_V1_FIELD_NAMES =>
  field in KVALITETSVURDERING_V1_FIELD_NAMES;

export const useFieldName = (field: Field): string => {
  if (isSaksdataKey(field)) {
    return SAKSDATA_FIELD_NAMES[field];
  }

  if (isKvalitetsvurderingV2TextKey(field)) {
    return KVALITETSVURDERING_V2_TEXTS[field].label;
  }

  if (isKvalitetsvurderingV2CheckboxGroupKey(field)) {
    return KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES[field];
  }

  if (isKvalitetsvurderingV1Key(field)) {
    return KVALITETSVURDERING_V1_FIELD_NAMES[field];
  }

  return field;
};
