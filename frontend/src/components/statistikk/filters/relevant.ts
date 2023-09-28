import { ISaksdata } from '@app/types/statistics/common';
import { UtfallEnum } from '@app/types/utfall';

export const filterIrrelevant = <T extends ISaksdata>(stats: T[]): T[] =>
  stats.filter(
    ({ utfallId }) =>
      utfallId !== UtfallEnum.RETUR && utfallId !== UtfallEnum.TRUKKET && utfallId !== UtfallEnum.UGUNST,
  );
