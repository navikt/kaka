import React from 'react';
import { StatsDate } from '../../../types/statistics/common';
import { useBehandlingstidField } from '../hooks/use-behandlingstid-param';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, KeyNumber, RedKeyNumber } from './styled-components';

interface Stat {
  avsluttetAvSaksbehandler: StatsDate;
}

interface Props {
  stats: Stat[];
}

export const Gjennomsnittstid = ({ stats }: Props) => {
  const field = useBehandlingstidField();

  const finished = stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null) ?? [];

  const averageDays = Math.round(finished.reduce<number>((acc, stat) => acc + stat[field], 0) / finished.length);

  const Wrapper = averageDays > 7 * 15 ? RedKeyNumber : KeyNumber;

  return (
    <>
      <KeyContent>
        <Wrapper>
          {cleanNumberDisplay(averageDays)} {averageDays === 1 ? 'dag' : 'dager'}
        </Wrapper>
        <span>Gjennomsnittlig saksbehandlingstid</span>
      </KeyContent>
    </>
  );
};
