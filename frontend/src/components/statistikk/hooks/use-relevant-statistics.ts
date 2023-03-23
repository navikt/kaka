import { useMemo } from 'react';
import { ISaksdata } from '@app/types/statistics/common';
import { filterIrrelevant } from '../filters/relevant';

export const useRelevantStatistics = <T extends ISaksdata>(stats: T[]): T[] =>
  useMemo(() => filterIrrelevant(stats), [stats]);
