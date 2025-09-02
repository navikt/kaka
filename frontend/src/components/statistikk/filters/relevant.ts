import { SakstypeEnum } from '@app/types/sakstype';
import type { ISaksdata } from '@app/types/statistics/common';
import { UtfallEnum } from '@app/types/utfall';

export const isRelevantSakstype = (sakstypeId: string): boolean =>
  sakstypeId === SakstypeEnum.KLAGE ||
  sakstypeId === SakstypeEnum.ANKE ||
  sakstypeId === SakstypeEnum.OMGJØRINGSKRAV ||
  sakstypeId === SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET;

export const filterIrrelevant = <T extends ISaksdata>(stats: T[]): T[] =>
  stats.filter(
    ({ utfallId, sakstypeId }) =>
      isRelevantSakstype(sakstypeId) &&
      utfallId !== UtfallEnum.RETUR &&
      utfallId !== UtfallEnum.TRUKKET &&
      utfallId !== UtfallEnum.UGUNST &&
      utfallId !== UtfallEnum.HENLAGT,
  );
