import { useKodeverkSakstype } from '@app/hooks/use-kodeverk-value';
import { SakstypeEnum } from '@app/types/sakstype';
import { Tag, type TagProps } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query/react';

interface Props {
  type: SakstypeEnum;
}

export const Type = ({ type }: Props) => {
  const name = useKodeverkSakstype(type ?? skipToken)?.navn;

  return (
    <Tag variant={VARIANT[type]} className="truncate">
      {name}
    </Tag>
  );
};

const VARIANT: Record<SakstypeEnum, TagProps['variant']> = {
  [SakstypeEnum.KLAGE]: 'alt1-filled',
  [SakstypeEnum.ANKE]: 'success-filled',
  [SakstypeEnum.ANKE_I_TRYGDERETTEN]: 'error-filled',
  [SakstypeEnum.OMGJØRINGSKRAV]: 'info-filled',
  [SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET]: 'alt2-filled',
};
