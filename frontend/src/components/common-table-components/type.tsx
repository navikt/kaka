import { useKodeverkSakstype } from '@app/hooks/use-kodeverk-value';
import { LabelAnke, LabelKlage } from '@app/styled-components/labels';
import { SakstypeEnum } from '@app/types/sakstype';
import { skipToken } from '@reduxjs/toolkit/query/react';

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
