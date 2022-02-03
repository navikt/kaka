import React, { useMemo } from 'react';
import { StatisticsProps } from '../types';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, KeyNumber } from './styled-components';

interface Props extends StatisticsProps {
  weeks: number;
}

export const Processed = ({ stats, weeks }: Props) => {
  const finished = useMemo(
    () => stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null) ?? [],
    [stats]
  );

  const behandlet = useMemo(
    () => finished.reduce((acc, { behandlingstidDays }) => (behandlingstidDays < weeks * 7 ? acc + 1 : acc), 0),
    [finished, weeks]
  );

  const percent = Math.round((behandlet / finished.length) * 100);

  return (
    <KeyContent>
      <KeyNumber>{cleanNumberDisplay(percent)} %</KeyNumber>
      <span>
        Behandlet innenfor {weeks} {weeks === 1 ? 'uke' : 'uker'}
      </span>
    </KeyContent>
  );
};
