import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { StatsDate } from '@app/types/statistics/common';
import { HelpText } from '@navikt/ds-react';
import { cleanNumberDisplay } from './formatting';
import { HelpTextContent, KeyContent, KeyLabelWithHelpText, KeyNumber } from './styled-components';

interface Stat {
  avsluttetAvSaksbehandler: StatsDate;
}

interface Props {
  stats: Stat[];
  version: KvalitetsvurderingVersion;
}

export const Finished = ({ stats, version }: Props) => {
  const count = stats?.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null).length;

  return (
    <KeyContent>
      <KeyNumber>{cleanNumberDisplay(count)}</KeyNumber>
      <KeyLabelWithHelpText>
        Registrerte saker
        <HelpText placement="bottom">
          <HelpTextContent>{getText(version)}</HelpTextContent>
        </HelpText>
      </KeyLabelWithHelpText>
    </KeyContent>
  );
};

const getText = (version: KvalitetsvurderingVersion): string => {
  switch (version) {
    case KvalitetsvurderingVersion.V1:
    case KvalitetsvurderingVersion.V2:
      return TEXT_V1_V2;
    case KvalitetsvurderingVersion.V3:
      return TEXT_V3;
  }
};

const TEXT_V1_V2 =
  'Registrerte saker inkluderer alle saker, både saker som er behandlet, og saker med utfall «henlagt», «trukket», «retur» eller «ugunst (ugyldig)».';
const TEXT_V3 =
  'Registrerte saker inkluderer alle saker, både saker som er behandlet, og saker med utfall «henlagt», «trukket» eller «retur».';
