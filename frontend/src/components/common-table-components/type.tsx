import { skipToken } from '@reduxjs/toolkit/query/react';
import React from 'react';
import { useKodeverkSakstype } from '../../hooks/use-kodeverk-value';
import { LabelAnke, LabelKlage } from '../../styled-components/labels';
import { SakstypeEnum } from '../../types/sakstype';

interface Props {
  type: SakstypeEnum;
}

export const Type = ({ type }: Props) => {
  const name = useKodeverkSakstype(type ?? skipToken)?.navn;

  if (type === SakstypeEnum.KLAGE) {
    return <LabelKlage>{name}</LabelKlage>;
  }

  if (type === SakstypeEnum.ANKE) {
    return <LabelAnke>{name}</LabelAnke>;
  }

  return <span>Ikke satt</span>;
};
