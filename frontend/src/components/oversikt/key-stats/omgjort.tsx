import React from 'react';
import { UtfallEnum } from '../../../types/utfall';
import { StatisticsProps } from '../types';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, RedKeyNumber } from './styled-components';

export const Omgjort = ({ stats }: StatisticsProps) => {
  const numOmgjort = stats?.filter(
    ({ utfallId }) =>
      utfallId === UtfallEnum.MEDHOLD || utfallId === UtfallEnum.DELVIS_MEDHOLD || utfallId === UtfallEnum.OPPHEVET
  );

  const percent =
    typeof numOmgjort === 'undefined' || typeof stats === 'undefined'
      ? '-'
      : cleanNumberDisplay(Math.round((numOmgjort.length / stats.length) * 100));

  return (
    <KeyContent>
      <RedKeyNumber>{percent} %</RedKeyNumber>
      <span>Omgjort av Klageinstansen</span>
    </KeyContent>
  );
};
