export enum FontColor {
  BLACK = '#000000',
  WHITE = '#FFFFFF',
}

export const getFontColor = (backgroundColor: string | undefined): FontColor => {
  if (typeof backgroundColor === 'undefined') {
    return FontColor.BLACK;
  }

  const split = backgroundColor.replace('#', '').split('');

  if (!isSixTuple(split)) {
    return FontColor.BLACK;
  }

  const [one, two, three, four, five, six] = split;

  const r = Number.parseInt(`${one}${two}`, 16);
  const g = Number.parseInt(`${three}${four}`, 16);
  const b = Number.parseInt(`${five}${six}`, 16);

  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

  return brightness > 125 ? FontColor.BLACK : FontColor.WHITE;
};

const isSixTuple = <T>(value: T[]): value is [T, T, T, T, T, T] => value.length === 6;
