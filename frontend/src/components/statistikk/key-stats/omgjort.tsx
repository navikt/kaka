import React, { useMemo } from 'react';
import { toPercent } from '../../../domain/number';
import { UtfallEnum } from '../../../types/utfall';
import { KeyContent, RedKeyNumber } from './styled-components';

interface Stat {
  utfallId: UtfallEnum;
}

interface Props {
  stats: Stat[];
  label: string;
}

export const Omgjort = ({ stats, label }: Props) => {
  const numOmgjort: number = useMemo(
    () =>
      stats.filter(
        ({ utfallId }) =>
          utfallId === UtfallEnum.MEDHOLD || utfallId === UtfallEnum.DELVIS_MEDHOLD || utfallId === UtfallEnum.OPPHEVET
      ).length,
    [stats]
  );

  return (
    <KeyContent>
      <RedKeyNumber>{percent(numOmgjort, stats.length)}</RedKeyNumber>
      <span>{label}</span>
    </KeyContent>
  );
};

const percent = (numerator: number, denominator: number): string => {
  if (denominator === 0) {
    return '- %';
  }

  return toPercent(numerator / denominator);
};
