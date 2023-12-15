import { BrukAvRaadgivendeOverlegeErrorFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';
import { KlageforberedelsenErrorFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';
import { UtredningenErrorFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/data';
import { VedtaketErrorFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import {
  IKvalitetsvurderingAllRegistreringshjemler,
  IKvalitetsvurderingBooleans,
  IKvalitetsvurderingSaksdataHjemler,
  IKvalitetsvurderingStrings,
} from '@app/types/kvalitetsvurdering/v2';

interface BaseParams {
  label: string;
  helpText?: string;
}

export type GroupErrorField =
  | KlageforberedelsenErrorFields
  | UtredningenErrorFields
  | VedtaketErrorFields
  | BrukAvRaadgivendeOverlegeErrorFields;

export interface CheckboxParams extends BaseParams {
  field: keyof IKvalitetsvurderingBooleans;
  groupErrorField?: GroupErrorField;
  type: TypeEnum.CHECKBOX;
  childList?: InputParams[];
  saksdatahjemler?: keyof IKvalitetsvurderingSaksdataHjemler;
  allRegistreringshjemler?: keyof IKvalitetsvurderingAllRegistreringshjemler;
}

export interface TextParams extends BaseParams {
  field: keyof IKvalitetsvurderingStrings;
  type: TypeEnum.TEXTAREA;
  description?: string;
}

export type InputParams = CheckboxParams | TextParams;

export enum TypeEnum {
  CHECKBOX,
  TEXTAREA,
}
