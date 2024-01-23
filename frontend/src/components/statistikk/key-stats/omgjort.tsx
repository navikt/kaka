import { HelpText } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { toPercent } from '@app/domain/number';
import { UtfallEnum } from '@app/types/utfall';
import { HelpTextContent, KeyContent, KeyLabelWithHelpText, RedKeyNumber } from './styled-components';

interface Stat {
  utfallId: UtfallEnum;
}

interface Props {
  stats: Stat[];
  label: string;
}

export const Omgjort = ({ stats, label }: Props) => {
  const numOmgjort: number = useMemo(
    () =>
      stats.filter(
        ({ utfallId }) =>
          utfallId === UtfallEnum.MEDHOLD || utfallId === UtfallEnum.DELVIS_MEDHOLD || utfallId === UtfallEnum.OPPHEVET,
      ).length,
    [stats],
  );

  return (
    <KeyContent>
      <RedKeyNumber>{percent(numOmgjort, stats.length)}</RedKeyNumber>
      <KeyLabelWithHelpText>
        {label}
        <HelpText placement="bottom">
          <HelpTextContent>{OMGJORT_HELP_TEXT}</HelpTextContent>
        </HelpText>
      </KeyLabelWithHelpText>
    </KeyContent>
  );
};

const percent = (numerator: number, denominator: number): string => {
  if (denominator === 0) {
    return '- %';
  }

  return toPercent(numerator / denominator);
};
