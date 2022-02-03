import React from 'react';
import { StatisticsProps } from '../types';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, KeyNumber } from './styled-components';

export const Finished = ({ stats }: StatisticsProps) => {
  const count = stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null).length;

  return (
    <KeyContent>
      <KeyNumber>{cleanNumberDisplay(count)}</KeyNumber>
      <span>Fullførte vurderinger</span>
    </KeyContent>
  );
};
