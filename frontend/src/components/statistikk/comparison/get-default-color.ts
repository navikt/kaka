import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { isNotUndefined } from '@app/functions/is-not';
import type { OptionValue } from '@app/types/statistics/common';

export const getDefaultColor = (options: OptionValue[]): ColorToken => {
  const usedColors = options.map(([, color]) => color);

  return COLORS.find((color) => !usedColors.includes(color)) ?? ColorToken.Beige500;
};

export const DEFAULT_COLORS = [
  [ColorToken.Accent500, ColorToken.Accent600, ColorToken.Accent700, ColorToken.Accent800, ColorToken.Accent900],
  [ColorToken.Warning500, ColorToken.Warning600, ColorToken.Warning700, ColorToken.Warning800, ColorToken.Warning900],
  [ColorToken.Success500, ColorToken.Success600, ColorToken.Success700, ColorToken.Success800, ColorToken.Success900],
  [ColorToken.Purple500, ColorToken.Purple600, ColorToken.Purple700, ColorToken.Purple800, ColorToken.Purple900],
  [ColorToken.Danger500, ColorToken.Danger600, ColorToken.Danger700, ColorToken.Danger800, ColorToken.Danger900],
  [ColorToken.Lime500, ColorToken.Lime600, ColorToken.Lime700, ColorToken.Lime800, ColorToken.Lime900],
  [ColorToken.Magenta500, ColorToken.Magenta600, ColorToken.Magenta700, ColorToken.Magenta800, ColorToken.Magenta900],
  [ColorToken.Beige500, ColorToken.Beige600, ColorToken.Beige700, ColorToken.Beige800, ColorToken.Beige900],
  [ColorToken.Neutral500, ColorToken.Neutral600, ColorToken.Neutral700, ColorToken.Neutral800, ColorToken.Neutral900],
  [
    ColorToken.BrandBlue500,
    ColorToken.BrandBlue600,
    ColorToken.BrandBlue700,
    ColorToken.BrandBlue800,
    ColorToken.BrandBlue900,
  ],
];

const SHADE_ORDER = [0, 3, 1, 4, 2];

export const COLORS = SHADE_ORDER.reduce<ColorToken[]>((acc, shade) => {
  const colors = DEFAULT_COLORS.map((mainColor) => mainColor[shade]).filter(isNotUndefined);

  acc.push(...colors);

  return acc;
}, []);
