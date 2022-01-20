import React from 'react';
import { useBehandlingstidParam } from '../hooks/use-behandlingstid-param';
import { useFilteredStatistics } from '../hooks/use-statistics';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, KeyNumber, RedKeyNumber } from './styled-components';

export const Gjennomsnittstid = () => {
  const stats = useFilteredStatistics();

  const [field] = useBehandlingstidParam();

  const finished = stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null) ?? [];

  const averageDays = Math.round(finished.reduce<number>((acc, stat) => acc + stat[field], 0) / finished.length);

  const Wrapper = averageDays > 7 * 15 ? RedKeyNumber : KeyNumber;

  return (
    <>
      <KeyContent>
        <Wrapper>
          {cleanNumberDisplay(averageDays)} {averageDays === 1 ? 'dag' : 'dager'}
        </Wrapper>
        <span>Gjennomsnitlig saksbehandlingstid</span>
      </KeyContent>
    </>
  );
};
