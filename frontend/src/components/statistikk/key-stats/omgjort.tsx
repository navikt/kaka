import React from 'react';
import { formatPercent } from '../../../functions/format-number';
import { UtfallEnum } from '../../../types/utfall';
import { StatisticsProps } from '../types';
import { KeyContent, RedKeyNumber } from './styled-components';

export const Omgjort = ({ stats }: StatisticsProps) => {
  const numOmgjort = stats?.filter(
    ({ utfallId }) =>
      utfallId === UtfallEnum.MEDHOLD || utfallId === UtfallEnum.DELVIS_MEDHOLD || utfallId === UtfallEnum.OPPHEVET
  );

  const percent =
    typeof numOmgjort === 'undefined' || typeof stats === 'undefined'
      ? '-'
      : formatPercent(numOmgjort.length / stats.length);

  return (
    <KeyContent>
      <RedKeyNumber>{percent}</RedKeyNumber>
      <span>Omgjort av Klageinstansen</span>
    </KeyContent>
  );
};
