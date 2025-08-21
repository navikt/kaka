import {
  BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS,
  BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS,
  BrukAvRaadgivendeOverlegeBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';

export const BRUK_AV_RAADGIVENDE_LEGE_TEXTS = {
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt]: {
    color: ColorToken.Danger500,
    label: BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS[BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt],
    helpText: BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS[BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt],
  },
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]: {
    color: ColorToken.Danger600,
    label:
      BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS[
        BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege
      ],
    helpText:
      BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS[
        BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege
      ],
  },
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin]: {
    color: ColorToken.Danger700,
    label:
      BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS[
        BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin
      ],
    helpText:
      BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS[
        BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin
      ],
  },
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert]: {
    color: ColorToken.Danger800,
    label:
      BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS[
        BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert
      ],
    helpText:
      BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS[
        BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert
      ],
  },
};
