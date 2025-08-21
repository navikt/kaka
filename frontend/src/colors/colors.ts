import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { UtfallEnum } from '@app/types/utfall';

export const UTFALL_COLOR_MAP = Object.freeze<Record<UtfallEnum, ColorToken>>({
  [UtfallEnum.AVVIST]: ColorToken.Neutral500,
  [UtfallEnum.DELVIS_MEDHOLD]: ColorToken.Warning500,
  [UtfallEnum.MEDHOLD]: ColorToken.Danger500,
  [UtfallEnum.OPPHEVET]: ColorToken.Lime500,
  [UtfallEnum.RETUR]: ColorToken.Info500,
  [UtfallEnum.STADFESTELSE]: ColorToken.Success500,
  [UtfallEnum.TRUKKET]: ColorToken.Warning500,
  [UtfallEnum.UGUNST]: ColorToken.Purple500,
  [UtfallEnum.INNSTILLING_STADFESTELSE]: ColorToken.Success700,
  [UtfallEnum.INNSTILLING_AVVIST]: ColorToken.Neutral500,
  [UtfallEnum.BESLUTNING_OM_IKKE_Å_OMGJØRE]: ColorToken.Beige500,
  [UtfallEnum.MEDHOLD_ETTER_FORVALTNINGSLOVEN_35]: ColorToken.Purple500,
  [UtfallEnum.STADFESTET_MED_EN_ANNEN_BEGRUNNELSE]: ColorToken.Warning500,

  [UtfallEnum.HEVET]: ColorToken.Neutral500, // Not used
  [UtfallEnum.HENVIST]: ColorToken.Neutral500, // Not used
});
