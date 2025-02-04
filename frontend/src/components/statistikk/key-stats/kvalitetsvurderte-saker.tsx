import { HelpText } from '@navikt/ds-react';
import { cleanNumberDisplay } from './formatting';
import { HelpTextContent, KeyContent, KeyLabelWithHelpText, KeyNumber } from './styled-components';

interface Props {
  length: number;
}

export const TotalProcessed = ({ length }: Props) => (
  <KeyContent>
    <KeyNumber>{cleanNumberDisplay(length)}</KeyNumber>

    <KeyLabelWithHelpText>
      Kvalitetsvurderte saker
      <HelpText placement="bottom">
        <HelpTextContent>
          Kvalitetsvurderte saker inkluderer kun saker som er kvalitetsvurdert. Sakene inkluderer ikke saker med utfall
          «trukket», «retur» eller «ugunst (ugyldig)».
        </HelpTextContent>
      </HelpText>
    </KeyLabelWithHelpText>
  </KeyContent>
);
