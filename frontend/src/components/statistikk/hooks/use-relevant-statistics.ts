import type { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { ISaksdata } from '@app/types/statistics/common';
import { useMemo } from 'react';
import { filterIrrelevant } from '../filters/relevant';

export const useRelevantStatistics = <T extends ISaksdata>(stats: T[], version: KvalitetsvurderingVersion): T[] =>
  useMemo(() => filterIrrelevant(stats, version), [stats, version]);
