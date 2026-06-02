import { ColorToken } from '@app/components/echarts/color-token';
import { SakstypeEnum } from '@app/types/sakstype';

export const SAKSTYPE_COLORS: Record<SakstypeEnum, ColorToken> = {
  [SakstypeEnum.KLAGE]: ColorToken.Purple500,
  [SakstypeEnum.ANKE]: ColorToken.Success500,
  [SakstypeEnum.ANKE_I_TRYGDERETTEN]: ColorToken.Danger500,
  [SakstypeEnum.OMGJØRINGSKRAV]: ColorToken.Info600,
  [SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET]: ColorToken.Lime600,
  [SakstypeEnum.BEGJÆRING_OM_GJENOPPTAK]: ColorToken.Warning600,
  [SakstypeEnum.BEGJÆRING_OM_GJENOPPTAK_I_TR]: ColorToken.Neutral600,
};
