import { skipToken } from '@reduxjs/toolkit/query';
import React from 'react';
import { useFullYtelseNameFromId } from '@app/hooks/use-kodeverk-value';
import { LabelYtelse } from '@app/styled-components/labels';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';

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
