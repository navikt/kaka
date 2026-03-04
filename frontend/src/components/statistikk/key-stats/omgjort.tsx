import { getOmgjortutfall } from '@app/components/statistikk/get-omgjortutfall';
import { OMGJORT_HELP_TEXT_V1_V2, OMGJORT_HELP_TEXT_V3 } from '@app/components/statistikk/texts';
import { toPercent } from '@app/domain/number';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { UtfallEnum } from '@app/types/utfall';
import { HelpText } from '@navikt/ds-react';
import { useMemo } from 'react';
import { HelpTextContent, KeyContent, KeyLabelWithHelpText, RedKeyNumber } from './styled-components';

interface Stat {
  utfallId: UtfallEnum;
}

interface Props {
  stats: Stat[];
  label: string;
  version: KvalitetsvurderingVersion;
}

export const Omgjort = ({ stats, label, version }: Props) => {
  const utfall = getOmgjortutfall(version);

  const numOmgjort: number = useMemo(
    () => stats.filter(({ utfallId }) => utfall.includes(utfallId)).length,
    [stats, utfall],
  );

  return (
    <KeyContent>
      <RedKeyNumber>{percent(numOmgjort, stats.length)}</RedKeyNumber>
      <KeyLabelWithHelpText>
        {label}
        <HelpText placement="bottom">
          <HelpTextContent>{getHelpText(version)}</HelpTextContent>
        </HelpText>
      </KeyLabelWithHelpText>
    </KeyContent>
  );
};

const getHelpText = (version: KvalitetsvurderingVersion): string => {
  switch (version) {
    case KvalitetsvurderingVersion.V1:
    case KvalitetsvurderingVersion.V2:
      return OMGJORT_HELP_TEXT_V1_V2;
    case KvalitetsvurderingVersion.V3:
      return OMGJORT_HELP_TEXT_V3;
  }
};

const percent = (numerator: number, denominator: number): string => {
  if (denominator === 0) {
    return '- %';
  }

  return toPercent(numerator / denominator);
};
