import { TilbakekrevingEnum } from '../../filters/types';

export const tilbakekrevingFilter = (
  tilbakekrevingSaksdata: boolean | null,
  tilbakekrevingQuery: TilbakekrevingEnum,
): boolean => {
  if (tilbakekrevingQuery === TilbakekrevingEnum.INCLUDE) {
    return true;
  }

  if (tilbakekrevingQuery === TilbakekrevingEnum.EXCLUDE) {
    return tilbakekrevingSaksdata === false;
  }

  return tilbakekrevingSaksdata === true;
};
