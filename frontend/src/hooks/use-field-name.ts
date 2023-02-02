import { KVALITETESVURDERING_V1_FIELD_NAMES as KVALITETSVURDERING_V1_FIELD_NAMES } from '../components/kvalitetsvurdering/kvalitetsskjema/v1/use-field-name';
import { KVALITETSVURDERING_V2_TEXTS } from '../types/kvalitetsvurdering/texts/structures';
import { IKvalitetsvurdering, KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES } from '../types/kvalitetsvurdering/v2';
import { ISaksdataComplete } from '../types/saksdata';

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
  | keyof typeof KVALITETSVURDERING_V1_FIELD_NAMES
  | keyof IKvalitetsvurdering
  | keyof typeof KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES
  | SaksdataKeys;

export const useFieldName = (field: Field): string =>
  SAKSDATA_FIELD_NAMES[field] ??
  KVALITETSVURDERING_V2_TEXTS[field]?.label ??
  KVALITETSVURDERING_V2_CHECKBOX_GROUP_NAMES[field] ??
  KVALITETSVURDERING_V1_FIELD_NAMES[field] ??
  field;
