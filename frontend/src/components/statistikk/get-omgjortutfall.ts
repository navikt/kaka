import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { UtfallEnum } from '@app/types/utfall';

const OMGJORTUTFALL_DEFAULT = [UtfallEnum.MEDHOLD, UtfallEnum.DELVIS_MEDHOLD, UtfallEnum.OPPHEVET];
const OMGJORTUTFALL_V3 = [...OMGJORTUTFALL_DEFAULT, UtfallEnum.UGUNST];

export const getOmgjortutfall = (version: KvalitetsvurderingVersion): UtfallEnum[] => {
  switch (version) {
    case KvalitetsvurderingVersion.V1:
    case KvalitetsvurderingVersion.V2:
      return OMGJORTUTFALL_DEFAULT;
    case KvalitetsvurderingVersion.V3:
      return OMGJORTUTFALL_V3;
  }
};
