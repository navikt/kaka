import { TilbakekrevingEnum } from '../../filters/types';

const TILBAKEKREVING_IDS = ['144', '145', '146', '147', '148', '149', '268'];

export const tilbakekrevingFilter = (
  hjemmelIdList: string[],
  tilbakekreving: TilbakekrevingEnum | undefined,
): boolean => {
  if (tilbakekreving === TilbakekrevingEnum.INCLUDE) {
    return true;
  }

  const only = tilbakekreving === TilbakekrevingEnum.ONLY;

  return TILBAKEKREVING_IDS.some((id) => hjemmelIdList.includes(id)) === only;
};
