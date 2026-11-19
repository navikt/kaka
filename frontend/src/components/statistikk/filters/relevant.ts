import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { RELEVANT_SAKSTYPER } from '@app/types/sakstype';
import type { ISaksdata } from '@app/types/statistics/common';
import { UtfallEnum } from '@app/types/utfall';

export const isRelevantSakstype = (sakstypeId: string): boolean => RELEVANT_SAKSTYPER.some((id) => id === sakstypeId);

const IRRELEVANT_UTFALL_COMMON = [UtfallEnum.RETUR, UtfallEnum.TRUKKET, UtfallEnum.HENLAGT];
const IRRELEVANT_UTFALL_V1_V2 = [...IRRELEVANT_UTFALL_COMMON, UtfallEnum.UGUNST];

const getIrrelevantUtfall = (version: KvalitetsvurderingVersion): UtfallEnum[] => {
  switch (version) {
    case KvalitetsvurderingVersion.V1:
    case KvalitetsvurderingVersion.V2:
      return IRRELEVANT_UTFALL_V1_V2;
    case KvalitetsvurderingVersion.V3:
      return IRRELEVANT_UTFALL_COMMON;
  }
};

export const filterIrrelevant = <T extends ISaksdata>(stats: T[], version: KvalitetsvurderingVersion): T[] => {
  const utfall = getIrrelevantUtfall(version);

  return stats.filter(({ utfallId, sakstypeId }) => isRelevantSakstype(sakstypeId) && !utfall.includes(utfallId));
};
