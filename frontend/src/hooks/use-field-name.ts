import {
  BRUK_AV_RAADGIVENDE_OVERLEGE_ERROR_LABELS,
  BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS,
  isBrukAvRaadgivendeOverlegeErrorField,
  isBrukAvRaadgivendeOverlegeField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';
import { MAIN_REASON_LABELS, isMainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  KLAGEFORBEREDELSEN_ERROR_LABELS,
  KLAGEFORBEREDELSEN_LABELS,
  isKlageForberedelsenErrorFields,
  isKlageforberedelsenField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';
import {
  UTREDNINGEN_ERROR_LABELS,
  UTREDNINGEN_LABELS,
  isUtredningenErrorFields,
  isUtredningenField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/data';
import {
  VEDTAKET_ERROR_LABELS,
  VEDTAKET_LABELS,
  isVedtaketErrorField,
  isVedtaketField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import type { ISaksdataComplete } from '@app/types/saksdata';

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

const isSaksdataKey = (field: string): field is SaksdataKeys => field in SAKSDATA_FIELD_NAMES;

export const useFieldName = (field: string): string => {
  if (isSaksdataKey(field)) {
    return SAKSDATA_FIELD_NAMES[field];
  }

  if (isMainReason(field)) {
    return MAIN_REASON_LABELS[field];
  }

  if (isKlageforberedelsenField(field)) {
    return KLAGEFORBEREDELSEN_LABELS[field];
  }

  if (isUtredningenField(field)) {
    return UTREDNINGEN_LABELS[field];
  }

  if (isVedtaketField(field)) {
    return VEDTAKET_LABELS[field];
  }

  if (isBrukAvRaadgivendeOverlegeField(field)) {
    return BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS[field];
  }

  if (isKlageForberedelsenErrorFields(field)) {
    return KLAGEFORBEREDELSEN_ERROR_LABELS[field];
  }

  if (isUtredningenErrorFields(field)) {
    return UTREDNINGEN_ERROR_LABELS[field];
  }

  if (isVedtaketErrorField(field)) {
    return VEDTAKET_ERROR_LABELS[field];
  }

  if (isBrukAvRaadgivendeOverlegeErrorField(field)) {
    return BRUK_AV_RAADGIVENDE_OVERLEGE_ERROR_LABELS[field];
  }

  return field;
};
