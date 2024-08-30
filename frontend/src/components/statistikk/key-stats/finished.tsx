import type { StatsDate } from '@app/types/statistics/common';
import { HelpText } from '@navikt/ds-react';
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
          <HelpTextContent>
            Registrerte saker inkluderer alle saker, både saker som er behandlet, og saker med utfall «trukket» eller
            «retur».
          </HelpTextContent>
        </HelpText>
      </KeyLabelWithHelpText>
    </KeyContent>
  );
};
