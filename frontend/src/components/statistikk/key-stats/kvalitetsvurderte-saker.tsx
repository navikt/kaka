import { HelpText } from '@navikt/ds-react';
import React from 'react';
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
          Kvalitetsvurderte saker inkluderer kun saker som er behandlet og som dermed også er kvalitetsvurdert. Sakene
          inkluderer ikke saker med utfall «trukket» eller «retur».
        </HelpTextContent>
      </HelpText>
    </KeyLabelWithHelpText>
  </KeyContent>
);
