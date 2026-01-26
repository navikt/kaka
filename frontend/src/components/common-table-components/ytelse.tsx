import { useFullYtelseNameFromId } from '@app/hooks/use-kodeverk-value';
import type { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { Tag } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query';

interface Props {
  ytelseId: string | null;
  ytelserVersion: KvalitetsvurderingVersion;
}

export const Ytelse = ({ ytelseId, ytelserVersion }: Props) => {
  const ytelse = useFullYtelseNameFromId(
    typeof ytelseId !== 'string' ? skipToken : { ytelseId, version: ytelserVersion },
  );

  return (
    <Tag data-color="info" variant="outline">
      {ytelse}
    </Tag>
  );
};
