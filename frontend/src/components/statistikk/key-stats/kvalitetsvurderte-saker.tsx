import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { HelpText } from '@navikt/ds-react';
import { cleanNumberDisplay } from './formatting';
import { HelpTextContent, KeyContent, KeyLabelWithHelpText, KeyNumber } from './styled-components';

interface Props {
  length: number;
  version: KvalitetsvurderingVersion;
}

export const TotalProcessed = ({ length, version }: Props) => (
  <KeyContent>
    <KeyNumber>{cleanNumberDisplay(length)}</KeyNumber>

    <KeyLabelWithHelpText>
      Kvalitetsvurderte saker
      <HelpText placement="bottom">
        <HelpTextContent>{getText(version)}</HelpTextContent>
      </HelpText>
    </KeyLabelWithHelpText>
  </KeyContent>
);

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
  'Kvalitetsvurderte saker inkluderer kun saker som er kvalitetsvurdert. Sakene inkluderer ikke saker med utfall «henlagt», «trukket», «retur» eller «ugunst (ugyldig)».';
const TEXT_V3 =
  'Kvalitetsvurderte saker inkluderer kun saker som er kvalitetsvurdert. Sakene inkluderer ikke saker med utfall «henlagt», «trukket» eller «retur».';
