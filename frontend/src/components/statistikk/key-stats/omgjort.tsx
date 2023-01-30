import React, { useMemo } from 'react';
import { toPercent } from '../../../domain/number';
import { UtfallEnum } from '../../../types/utfall';
import { KeyContent, RedKeyNumber } from './styled-components';

interface Stat {
  utfallId: UtfallEnum;
}

interface Props {
  stats: Stat[];
}

export const Omgjort = ({ stats }: Props) => {
  const numOmgjort: number = useMemo(
    () =>
      stats.filter(
        ({ utfallId }) =>
          utfallId === UtfallEnum.MEDHOLD || utfallId === UtfallEnum.DELVIS_MEDHOLD || utfallId === UtfallEnum.OPPHEVET
      ).length,
    [stats]
  );

  const relevantStats: number = useMemo(
    () =>
      stats.filter(
        ({ utfallId }) =>
          utfallId !== UtfallEnum.RETUR && utfallId !== UtfallEnum.TRUKKET && utfallId !== UtfallEnum.UGUNST
      ).length,
    [stats]
  );

  return (
    <KeyContent>
      <RedKeyNumber>{percent(numOmgjort, relevantStats)}</RedKeyNumber>
      <span>Omgjort av Klageinstansen</span>
    </KeyContent>
  );
};

const percent = (numerator: number, denominator: number): string => {
  if (denominator === 0) {
    return '-';
  }

  return toPercent(numerator / denominator);
};
