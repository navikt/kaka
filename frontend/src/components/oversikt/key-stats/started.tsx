import React from 'react';
import { useFilteredStatistics } from '../../../hooks/use-statistics';
import { cleanNumberDisplay } from './formatting';
import { KeyContent, KeyNumber } from './styled-components';

export const Started = () => {
  const stats = useFilteredStatistics();

  const count = stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler === null).length;

  return (
    <KeyContent>
      <KeyNumber>{cleanNumberDisplay(count)}</KeyNumber>
      <span>Påbegynte vurderinger</span>
    </KeyContent>
  );
};
