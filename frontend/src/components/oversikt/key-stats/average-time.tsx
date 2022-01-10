import React from 'react';
import { useFilteredStatistics } from '../../../hooks/use-statistics';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, KeyNumber, RedKeyNumber } from './styled-components';

export const Gjennomsnittstid = () => {
  const stats = useFilteredStatistics();

  const finished = stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null) ?? [];

  const averageDays = Math.round(
    finished.reduce<number>((acc, { behandlingstidDays }) => acc + behandlingstidDays, 0) / finished.length
  );

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
