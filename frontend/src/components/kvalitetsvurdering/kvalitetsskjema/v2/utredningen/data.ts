import { MAIN_REASON_LABELS, MainReason } from '../data';

export const HEADER = MAIN_REASON_LABELS[MainReason.Utredningen];

export enum UtredningenBoolean {
  utredningenAvMedisinskeForhold = 'utredningenAvMedisinskeForhold',
  utredningenAvInntektsforhold = 'utredningenAvInntektsforhold',
  utredningenAvArbeidsaktivitet = 'utredningenAvArbeidsaktivitet',
  utredningenAvEoesUtenlandsproblematikk = 'utredningenAvEoesUtenlandsproblematikk',
  utredningenAvSivilstandBoforhold = 'utredningenAvSivilstandBoforhold',
  utredningenAvAndreAktuelleForholdISaken = 'utredningenAvAndreAktuelleForholdISaken',
}

const FIELDS = Object.values(UtredningenBoolean);

export const isUtredningenField = (field: string): field is UtredningenBoolean => FIELDS.some((f) => f === field);

export enum UtredningenErrorFields {
  utredningenGroup = 'utredningenGroup',
}

const ERROR_FIELDS = Object.values(UtredningenErrorFields);

export const isUtredningenErrorFields = (field: string): field is UtredningenErrorFields =>
  ERROR_FIELDS.some((f) => f === field);

export const UTREDNINGEN_LABELS: Record<UtredningenBoolean, string> = {
  [UtredningenBoolean.utredningenAvMedisinskeForhold]: 'Utredningen av medisinske forhold',
  [UtredningenBoolean.utredningenAvInntektsforhold]: 'Utredningen av inntektsforhold',
  [UtredningenBoolean.utredningenAvArbeidsaktivitet]: 'Utredningen av arbeidsaktivitet',
  [UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk]: 'Utredningen av EØS-/utenlandsproblematikk',
  [UtredningenBoolean.utredningenAvSivilstandBoforhold]: 'Utredningen av sivilstand/boforhold',
  [UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken]: 'Utredningen av andre aktuelle forhold i saken',
};

export const UTREDNINGEN_ERROR_LABELS: Record<UtredningenErrorFields, string> = {
  [UtredningenErrorFields.utredningenGroup]: HEADER,
};

export const UTREDNINGEN_HELP_TEXTS: Record<UtredningenBoolean, string> = {
  [UtredningenBoolean.utredningenAvMedisinskeForhold]:
    'F.eks. er det ikke innhentet uttalelse fra en behandler eller rapport fra rehabiliteringsopphold. Dersom opplysninger som er innhentet ikke er gode nok, og NAV burde bedt om presiseringer eller mer utdypede opplysninger, registreres det her.',
  [UtredningenBoolean.utredningenAvInntektsforhold]:
    'F.eks. er det ikke innhentet lønnslipper eller kontoopplysninger.',
  [UtredningenBoolean.utredningenAvArbeidsaktivitet]:
    'F.eks. er det ikke innhentet arbeidskontrakt, timelister, eller rapporter fra tiltak.',
  [UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk]:
    'F.eks. er det ikke er innhentet opplysninger om trygdetid i andre land. Er EØS-/utenlandsproblematikk ikke fanget opp i det hele tatt, registreres også det her.',
  [UtredningenBoolean.utredningenAvSivilstandBoforhold]:
    'Du registrerer også her om boforhold/sivilstand er av betydning, men ikke avklart.',
  [UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken]:
    'Du kan skrive konkret hvilke feil ved utredningen av andre aktuelle forhold det gjelder under «Annet» nederst.',
};
