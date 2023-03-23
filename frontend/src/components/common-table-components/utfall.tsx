import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import { useKodeverkUtfall } from '@app/hooks/use-kodeverk-value';

interface Props {
  utfall: string | null;
}

export const Utfall = ({ utfall }: Props) => <>{useKodeverkUtfall(utfall ?? skipToken)?.navn ?? ''}</>;
