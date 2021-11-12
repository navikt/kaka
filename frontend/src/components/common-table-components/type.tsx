import { skipToken } from '@reduxjs/toolkit/query/react';
import React from 'react';
import { useKodeverkSakstype } from '../../hooks/use-kodeverk-value';
import { LabelMain } from '../../styled-components/labels';

interface Props {
  type: string | null;
}

export const Type = ({ type }: Props) => {
  const name = useKodeverkSakstype(type ?? skipToken)?.navn;

  if (typeof name === 'undefined') {
    return <span>Ikke satt</span>;
  }

  return <LabelMain>{name}</LabelMain>;
};
