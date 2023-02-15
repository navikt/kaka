import { HelpText } from '@navikt/ds-react';
import React from 'react';
import { StatsDate } from '../../..//types/statistics/common';
import { cleanNumberDisplay } from './formatting';
import { HelpTextContent, KeyContent, KeyLabelWithHelpText, KeyNumber } from './styled-components';

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
      <KeyLabelWithHelpText>
        Registrerte saker
        <HelpText placement="bottom">
          <HelpTextContent>Registrerte saker inkluderer alle saker uansett utfall.</HelpTextContent>
        </HelpText>
      </KeyLabelWithHelpText>
    </KeyContent>
  );
};
