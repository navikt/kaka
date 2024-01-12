import { NAV_COLORS } from '@app/colors/colors';
import {
  BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS,
  BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS,
  BrukAvRaadgivendeOverlegeBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';

export const BRUK_AV_RAADGIVENDE_LEGE_TEXTS = {
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt]: {
    color: NAV_COLORS.red[400],
    label: BRUK_AV_RAADGIVENDE_OVERLEGE_LABELS[BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt],
    helpText: BRUK_AV_RAADGIVENDE_OVERLEGE_HELP_TEXTS[BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt],
  },
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]: {
    color: NAV_COLORS.red[500],
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
    color: NAV_COLORS.red[600],
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
    color: NAV_COLORS.red[700],
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
