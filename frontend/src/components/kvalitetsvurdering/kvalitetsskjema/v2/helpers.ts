import {
  BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS,
  BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS,
  BrukAvRaadgivendeOverlegeBoolean,
  isBrukAvRaadgivendeOverlegeField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';
import {
  CheckboxParams,
  InputParams,
  TextParams,
  TypeEnum,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/types';
import {
  KLAGEFORBEREDELSEN_DESCRIPTIONS,
  KLAGEFORBEREDELSEN_HELP_TEXTS,
  KLAGEFORBEREDELSEN_LABELS,
  KlageforberedelsenBoolean,
  KlageforberedelsenErrorFields,
  KlageforberedelsenTextInput,
  isKlageforberedelsenField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';
import {
  VEDTAKET_HELP_TEXTS,
  VEDTAKET_LABELS,
  VedtaketAllregistreringshjemlerList,
  VedtaketBoolean,
  VedtaketErrorFields,
  VedtaketHjemlerListBoolean,
  VedtaketSaksdatahjemlerList,
  isVedtaketField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { UTREDNINGEN_HELP_TEXTS, UTREDNINGEN_LABELS, UtredningenBoolean, isUtredningenField } from './utredningen/data';

type Booleans =
  | KlageforberedelsenBoolean
  | UtredningenBoolean
  | VedtaketBoolean
  | VedtaketHjemlerListBoolean
  | BrukAvRaadgivendeOverlegeBoolean;

type ErrorFields = KlageforberedelsenErrorFields | VedtaketErrorFields;
interface Params<T, U> {
  field: T;
  childList?: InputParams[];
  groupErrorField?: U;
  saksdatahjemler?: VedtaketSaksdatahjemlerList;
  allRegistreringshjemler?: VedtaketAllregistreringshjemlerList;
}

export const getCheckbox = <T extends Booleans, U extends ErrorFields>({
  field,
  childList,
  groupErrorField,
  saksdatahjemler,
  allRegistreringshjemler,
}: Params<T, U>): CheckboxParams => ({
  field,
  label: getLabel(field),
  type: TypeEnum.CHECKBOX,
  helpText: getHelpText(field),
  groupErrorField,
  childList,
  saksdatahjemler,
  allRegistreringshjemler,
});

export const getTextInput = (field: KlageforberedelsenTextInput): TextParams => ({
  field,
  label: KLAGEFORBEREDELSEN_LABELS[field],
  type: TypeEnum.TEXTAREA,
  helpText: KLAGEFORBEREDELSEN_HELP_TEXTS[field],
  description: KLAGEFORBEREDELSEN_DESCRIPTIONS[field],
});

const getLabel = (field: Booleans): string => {
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

  return field;
};

const getHelpText = (field: Booleans): string | undefined => {
  if (isKeyOfKlageforberedelsenHelpTexts(field)) {
    return KLAGEFORBEREDELSEN_HELP_TEXTS[field];
  }

  if (isUtredningenField(field)) {
    return UTREDNINGEN_HELP_TEXTS[field];
  }

  if (isVedtaketField(field)) {
    return VEDTAKET_HELP_TEXTS[field];
  }

  if (isBrukAvRaadgivendeOverlegeField(field)) {
    return BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS[field];
  }

  return undefined;
};

const isKeyOfKlageforberedelsenHelpTexts = (key: string): key is keyof typeof KLAGEFORBEREDELSEN_HELP_TEXTS =>
  key in KLAGEFORBEREDELSEN_HELP_TEXTS;
