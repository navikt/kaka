import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import { useKodeverkTema } from '../../hooks/use-kodeverk-value';
import { LabelTema } from '../../styled-components/labels';

interface Props {
  tema: string | null;
}

export const Tema = ({ tema }: Props) => {
  const temaName = useKodeverkTema(tema ?? skipToken)?.navn;

  if (typeof temaName === 'undefined') {
    return <span>Ikke satt</span>;
  }

  return <LabelTema tema={tema}>{temaName}</LabelTema>;
};
