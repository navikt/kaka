import { MAIN_REASON_LABELS, MainReason } from '../data';

export const HEADER = MAIN_REASON_LABELS[MainReason.BrukAvRaadgivendeLege];

export enum BrukAvRaadgivendeOverlegeBoolean {
  raadgivendeLegeIkkebrukt = 'raadgivendeLegeIkkebrukt',
  raadgivendeLegeMangelfullBrukAvRaadgivendeLege = 'raadgivendeLegeMangelfullBrukAvRaadgivendeLege',
  raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin = 'raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin',
  raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert = 'raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert',
}

const FIELDS = Object.values(BrukAvRaadgivendeOverlegeBoolean);

export const isBrukAvRaadgivendeOverlegeField = (value: string): value is BrukAvRaadgivendeOverlegeBoolean =>
  FIELDS.some((f) => f === value);

export enum BrukAvRaadgivendeOverlegeErrorFields {
  brukAvRaadgivendeLegeGroup = 'brukAvRaadgivendeLegeGroup',
}

const ERROR_FIELDS = Object.values(BrukAvRaadgivendeOverlegeErrorFields);

export const isBrukAvRaadgivendeOverlegeErrorField = (value: string): value is BrukAvRaadgivendeOverlegeErrorFields =>
  ERROR_FIELDS.some((f) => f === value);

export const BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS: Record<BrukAvRaadgivendeOverlegeBoolean, string> = {
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt]: 'Rådgivende lege er ikke brukt',
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]:
    'Saksbehandlers bruk av rådgivende lege er mangelfull',
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin]:
    'Rådgivende lege har uttalt seg om tema utover trygdemedisin',
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert]:
    'Rådgivende lege er brukt, men begrunnelsen fra rådgivende lege er mangelfull eller ikke dokumentert',
};

export const BRUK_AV_RAADGIVENDE_OVERLEGE_ERROR_LABELS: Record<BrukAvRaadgivendeOverlegeErrorFields, string> = {
  [BrukAvRaadgivendeOverlegeErrorFields.brukAvRaadgivendeLegeGroup]: HEADER,
};

export const BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS: Partial<Record<BrukAvRaadgivendeOverlegeBoolean, string>> = {
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt]:
    'Du registrerer her om rådgivende lege burde vært brukt for å sikre og/eller synliggjøre at det trygdemedisinske er forstått riktig.',
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]:
    'F.eks. har saksbehandler stilt feil spørsmål, eller saksbehandler har lagt for mye vekt på vurdering fra rådgivende lege/brukt som «fasit».',
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert]:
    'Du registrerer her om begrunnelsen er dokumentert, men for tynn, f.eks. kun inneholder en konklusjon. Du registrerer her om det ikke går frem hva slags dokumentasjon rådgivende lege har sett. Du registrerer også her om vurderingen fra rådgivende lege ikke er dokumentert i det hele tatt.',
};
