import React, { useMemo } from 'react';
import { toPercent } from '@app/domain/number';
import { StatsDate } from '@app/types/statistics/common';
import { KeyContent, KeyNumber } from './styled-components';

interface Stat {
  avsluttetAvSaksbehandler: StatsDate;
  kaBehandlingstidDays: number;
}

interface Props {
  weeks: number;
  stats: Stat[];
}

export const Processed = ({ stats, weeks }: Props) => {
  const finished = useMemo(
    () => stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null) ?? [],
    [stats]
  );

  const behandlet = useMemo(
    () => finished.reduce((acc, { kaBehandlingstidDays }) => (kaBehandlingstidDays < weeks * 7 ? acc + 1 : acc), 0),
    [finished, weeks]
  );

  const fraction = behandlet / finished.length;
  const percent = Number.isNaN(fraction) ? '-' : toPercent(fraction);

  return (
    <KeyContent>
      <KeyNumber>{percent}</KeyNumber>
      <span>
        Behandlet innenfor {weeks} {weeks === 1 ? 'uke' : 'uker'}
      </span>
    </KeyContent>
  );
};
