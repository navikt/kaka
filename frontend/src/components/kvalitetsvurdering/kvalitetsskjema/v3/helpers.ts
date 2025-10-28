import {
  type CheckboxParams,
  type InputParams,
  TypeEnum,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/common/types';
import {
  type AllSaksbehandlingsregleneBoolean,
  type BegrunnelsespliktenSaksdataHjemlerLists,
  SAKSBEHANDLINGSREGLENE_HELP_TEXTS,
  SAKSBEHANDLINGSREGLENE_LABELS,
  type SaksbehandlingsregleneErrorFields,
  isSaksbehandlingsregleneField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/data';
import {
  SÆRREGELVERKET_HELP_TEXTS,
  SÆRREGELVERKET_LABELS,
  type SærregelverketBoolean,
  type SærregelverketErrorFields,
  type SærregelverketHjemlerFromYtelseList,
  type SærregelverketSaksdataHjemlerList,
  isSærregelverketField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/særregelverket/data';
import {
  TRYGDEMEDISIN_HELP_TEXTS,
  TRYGDEMEDISIN_LABELS,
  type TrygdemedisinBoolean,
  type TrygdemedisinErrorFields,
  isTrygdemedisinField,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/trygdemedisin/data';

type Booleans = TrygdemedisinBoolean | AllSaksbehandlingsregleneBoolean | SærregelverketBoolean;

type ErrorFields = TrygdemedisinErrorFields | SaksbehandlingsregleneErrorFields | SærregelverketErrorFields;

interface Params<T, U> {
  field: T;
  childList?: InputParams[];
  groupErrorField?: U;
  saksdatahjemler?: BegrunnelsespliktenSaksdataHjemlerLists | SærregelverketSaksdataHjemlerList;
  allRegistreringshjemler?: SærregelverketHjemlerFromYtelseList;
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

const getLabel = (field: Booleans): string => {
  if (isSærregelverketField(field)) {
    return SÆRREGELVERKET_LABELS[field];
  }

  if (isSaksbehandlingsregleneField(field)) {
    return SAKSBEHANDLINGSREGLENE_LABELS[field];
  }

  if (isTrygdemedisinField(field)) {
    return TRYGDEMEDISIN_LABELS[field];
  }

  return field;
};

const getHelpText = (field: Booleans): string | undefined => {
  if (isSærregelverketField(field)) {
    return SÆRREGELVERKET_HELP_TEXTS[field];
  }

  if (isSaksbehandlingsregleneField(field)) {
    return SAKSBEHANDLINGSREGLENE_HELP_TEXTS[field];
  }

  if (isTrygdemedisinField(field)) {
    return TRYGDEMEDISIN_HELP_TEXTS[field];
  }

  return undefined;
};
