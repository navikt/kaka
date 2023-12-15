import { MAIN_REASON_LABELS, MainReason } from '../data';

export const HEADER = MAIN_REASON_LABELS[MainReason.Utredningen];

export enum UtredningenFields {
  utredningenAvMedisinskeForhold = 'utredningenAvMedisinskeForhold',
  utredningenAvInntektsforhold = 'utredningenAvInntektsforhold',
  utredningenAvArbeidsaktivitet = 'utredningenAvArbeidsaktivitet',
  utredningenAvEoesUtenlandsproblematikk = 'utredningenAvEoesUtenlandsproblematikk',
  utredningenAvSivilstandBoforhold = 'utredningenAvSivilstandBoforhold',
  utredningenAvAndreAktuelleForholdISaken = 'utredningenAvAndreAktuelleForholdISaken',
}

const FIELDS = Object.values(UtredningenFields);

export const isUtredningenField = (field: string): field is UtredningenFields => FIELDS.some((f) => f === field);

export enum UtredningenErrorFields {
  utredningenGroup = 'utredningenGroup',
}

const ERROR_FIELDS = Object.values(UtredningenErrorFields);

export const isUtredningenErrorFields = (field: string): field is UtredningenErrorFields =>
  ERROR_FIELDS.some((f) => f === field);

export const UTREDNINGEN_LABELS: Record<UtredningenFields, string> = {
  [UtredningenFields.utredningenAvMedisinskeForhold]: 'Utredningen av medisinske forhold',
  [UtredningenFields.utredningenAvInntektsforhold]: 'Utredningen av inntektsforhold',
  [UtredningenFields.utredningenAvArbeidsaktivitet]: 'Utredningen av arbeidsaktivitet',
  [UtredningenFields.utredningenAvEoesUtenlandsproblematikk]: 'Utredningen av EØS-/utenlandsproblematikk',
  [UtredningenFields.utredningenAvSivilstandBoforhold]: 'Utredningen av sivilstand/boforhold',
  [UtredningenFields.utredningenAvAndreAktuelleForholdISaken]: 'Utredningen av andre aktuelle forhold i saken',
};

export const UTREDNINGEN_ERROR_LABELS: Record<UtredningenErrorFields, string> = {
  [UtredningenErrorFields.utredningenGroup]: HEADER,
};
