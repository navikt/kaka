import { MAIN_REASON_LABELS, MainReason } from '../data';

export const HEADER = MAIN_REASON_LABELS[MainReason.BrukAvRaadgivendeLege];

export enum BrukAvRaadgivendeOverlegeFields {
  raadgivendeLegeIkkebrukt = 'raadgivendeLegeIkkebrukt',
  raadgivendeLegeMangelfullBrukAvRaadgivendeLege = 'raadgivendeLegeMangelfullBrukAvRaadgivendeLege',
  raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin = 'raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin',
  raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert = 'raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert',
}

const FIELDS = Object.values(BrukAvRaadgivendeOverlegeFields);

export const isBrukAvRaadgivendeOverlegeField = (value: string): value is BrukAvRaadgivendeOverlegeFields =>
  FIELDS.some((f) => f === value);

export enum BrukAvRaadgivendeOverlegeErrorFields {
  brukAvRaadgivendeLegeGroup = 'brukAvRaadgivendeLegeGroup',
}

const ERROR_FIELDS = Object.values(BrukAvRaadgivendeOverlegeErrorFields);

export const isBrukAvRaadgivendeOverlegeErrorField = (value: string): value is BrukAvRaadgivendeOverlegeErrorFields =>
  ERROR_FIELDS.some((f) => f === value);

export const BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS: Record<BrukAvRaadgivendeOverlegeFields, string> = {
  [BrukAvRaadgivendeOverlegeFields.raadgivendeLegeIkkebrukt]: 'Rådgivende lege er ikke brukt',
  [BrukAvRaadgivendeOverlegeFields.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]:
    'Saksbehandlers bruk av rådgivende lege er mangelfull',
  [BrukAvRaadgivendeOverlegeFields.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin]:
    'Rådgivende lege har uttalt seg om tema utover trygdemedisin',
  [BrukAvRaadgivendeOverlegeFields.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert]:
    'Rådgivende lege er brukt, men begrunnelsen fra rådgivende lege er mangelfull eller ikke dokumentert',
};

export const BRUK_AV_RAADGIVENDE_OVERLEGE_ERROR_LABELS: Record<BrukAvRaadgivendeOverlegeErrorFields, string> = {
  [BrukAvRaadgivendeOverlegeErrorFields.brukAvRaadgivendeLegeGroup]: HEADER,
};
