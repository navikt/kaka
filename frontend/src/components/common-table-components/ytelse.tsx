import { useFullYtelseNameFromId } from '@app/hooks/use-kodeverk-value';
import { LabelYtelse } from '@app/styled-components/labels';
import type { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { skipToken } from '@reduxjs/toolkit/query';

interface Props {
  ytelseId: string | null;
  ytelserVersion: KvalitetsvurderingVersion;
}

export const Ytelse = ({ ytelseId, ytelserVersion }: Props) => {
  const ytelse = useFullYtelseNameFromId(
    typeof ytelseId !== 'string' ? skipToken : { ytelseId, version: ytelserVersion },
  );

  return <LabelYtelse>{ytelse}</LabelYtelse>;
};
