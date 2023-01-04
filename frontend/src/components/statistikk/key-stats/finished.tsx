import React from 'react';
import { StatsDate } from '../../..//types/statistics/common';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, KeyNumber } from './styled-components';

interface Stat {
  avsluttetAvSaksbehandler: StatsDate;
}

interface Props {
  stats: Stat[];
}

export const Finished = ({ stats }: Props) => {
  const count = stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null).length;

  return (
    <KeyContent>
      <KeyNumber>{cleanNumberDisplay(count)}</KeyNumber>
      <span>Fullførte vurderinger</span>
    </KeyContent>
  );
};
