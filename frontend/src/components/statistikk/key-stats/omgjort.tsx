import React, { useMemo } from 'react';
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
      <RedKeyNumber>{toPercent(numOmgjort, relevantStats)} %</RedKeyNumber>
      <span>Omgjort av Klageinstansen</span>
    </KeyContent>
  );
};

const toPercent = (numerator: number, denominator: number): string => {
  if (denominator === 0) {
    return '-';
  }

  return ((numerator / denominator) * 100).toLocaleString('nb-no', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
