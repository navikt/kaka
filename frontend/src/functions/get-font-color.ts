import { ColorToken } from '@app/components/statistikk/colors/token-name';

export const DARK_COLOR = ColorToken.Neutral1000; // --ax-text-neutral
export const LIGHT_COLOR = ColorToken.Neutral000; // --ax-text-neutral-contrast

export const getFontColor = (backgroundColor: string): ColorToken => {
  const split = backgroundColor.replace('#', '').split('');

  if (!isSixTuple(split)) {
    return DARK_COLOR;
  }

  const [one, two, three, four, five, six] = split;

  const r = Number.parseInt(`${one}${two}`, 16);
  const g = Number.parseInt(`${three}${four}`, 16);
  const b = Number.parseInt(`${five}${six}`, 16);

  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

  return brightness > 125 ? DARK_COLOR : LIGHT_COLOR;
};

const isSixTuple = <T>(value: T[]): value is [T, T, T, T, T, T] => value.length === 6;
