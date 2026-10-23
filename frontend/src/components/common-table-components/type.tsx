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
    <Tag variant="strong" data-color={COLOR[type]} className="truncate">
      {name}
    </Tag>
  );
};

const COLOR: Record<SakstypeEnum, TagProps['data-color']> = {
  [SakstypeEnum.KLAGE]: 'meta-purple',
  [SakstypeEnum.ANKE]: 'success',
  [SakstypeEnum.ANKE_I_TRYGDERETTEN]: 'danger',
  [SakstypeEnum.OMGJØRINGSKRAV]: 'info',
  [SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET]: 'meta-lime',
  [SakstypeEnum.BEGJÆRING_OM_GJENOPPTAK]: 'success',
  [SakstypeEnum.BEGJÆRING_OM_GJENOPPTAK_I_TR]: 'neutral',
};
