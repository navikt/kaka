import {
  TRYGDEMEDISIN_HELP_TEXTS,
  TRYGDEMEDISIN_LABELS,
  TrygdemedisinBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/trygdemedisin/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';

export const TRYGDEMEDISIN_TEXTS = {
  [TrygdemedisinBoolean.raadgivendeLegeIkkebrukt]: {
    color: ColorToken.Success200,
    label: TRYGDEMEDISIN_LABELS[TrygdemedisinBoolean.raadgivendeLegeIkkebrukt],
    helpText: TRYGDEMEDISIN_HELP_TEXTS[TrygdemedisinBoolean.raadgivendeLegeIkkebrukt],
  },
  [TrygdemedisinBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]: {
    color: ColorToken.Success300,
    label: TRYGDEMEDISIN_LABELS[TrygdemedisinBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege],
    helpText: TRYGDEMEDISIN_HELP_TEXTS[TrygdemedisinBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege],
  },
  [TrygdemedisinBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin]: {
    color: ColorToken.Success400,
    label: TRYGDEMEDISIN_LABELS[TrygdemedisinBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin],
    helpText: TRYGDEMEDISIN_HELP_TEXTS[TrygdemedisinBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin],
  },
  [TrygdemedisinBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert]: {
    color: ColorToken.Success500,
    label: TRYGDEMEDISIN_LABELS[TrygdemedisinBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert],
    helpText: TRYGDEMEDISIN_HELP_TEXTS[TrygdemedisinBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert],
  },
};
