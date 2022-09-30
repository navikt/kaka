import React, { useMemo } from 'react';
import { UtfallEnum } from '../../../types/utfall';
import { StatisticsProps } from '../types';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, RedKeyNumber } from './styled-components';

export const Omgjort = ({ stats }: StatisticsProps) => {
  const numOmgjort: number = useMemo(
    () =>
      stats?.filter(
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

  const percent = cleanNumberDisplay(Math.round((numOmgjort / relevantStats) * 100));

  return (
    <KeyContent>
      <RedKeyNumber>{percent} %</RedKeyNumber>
      <span>Omgjort av Klageinstansen</span>
    </KeyContent>
  );
};
