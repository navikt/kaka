import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { UtfallEnum } from '@app/types/utfall';

export const UTFALL_COLOR_MAP = Object.freeze<Record<UtfallEnum, ColorToken>>({
  [UtfallEnum.DELVIS_MEDHOLD]: ColorToken.Magenta500,
  [UtfallEnum.MEDHOLD]: ColorToken.Warning500,
  [UtfallEnum.OPPHEVET]: ColorToken.Purple500,
  [UtfallEnum.MEDHOLD_ETTER_FORVALTNINGSLOVEN_35]: ColorToken.Danger500,

  [UtfallEnum.STADFESTELSE]: ColorToken.Success500,
  [UtfallEnum.INNSTILLING_STADFESTELSE]: ColorToken.Success700,
  [UtfallEnum.STADFESTET_MED_EN_ANNEN_BEGRUNNELSE]: ColorToken.Accent500,
  [UtfallEnum.BESLUTNING_OM_IKKE_Å_OMGJØRE]: ColorToken.Lime500,

  [UtfallEnum.INNSTILLING_AVVIST]: ColorToken.Neutral500,
  [UtfallEnum.AVVIST]: ColorToken.Neutral500,

  [UtfallEnum.RETUR]: ColorToken.Info500,
  [UtfallEnum.TRUKKET]: ColorToken.Purple900,
  [UtfallEnum.UGUNST]: ColorToken.Beige500,

  [UtfallEnum.HEVET]: ColorToken.Neutral500, // Not used
  [UtfallEnum.HENVIST]: ColorToken.Neutral500, // Not used
});
