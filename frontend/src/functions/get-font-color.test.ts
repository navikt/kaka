import { NAV_COLORS } from '@app/colors/colors';
import { FontColor, getFontColor } from './get-font-color';

describe('get font color for background', () => {
  it('should return black for white', () => {
    expect.assertions(1);

    const expected = FontColor.BLACK;
    const actual = getFontColor('#FFFFFF');
    expect(actual).toBe(expected);
  });

  it('should return white for black', () => {
    expect.assertions(1);

    const expected = FontColor.WHITE;
    const actual = getFontColor('#000000');
    expect(actual).toBe(expected);
  });

  it('should return white for NAV blue 900', () => {
    expect.assertions(1);

    const expected = FontColor.WHITE;
    const actual = getFontColor(rgbToHex(NAV_COLORS.blue[900]));
    expect(actual).toBe(expected);
  });

  it('should return white for NAV blue 800', () => {
    expect.assertions(1);

    const expected = FontColor.WHITE;
    const actual = getFontColor(rgbToHex(NAV_COLORS.blue[800]));
    expect(actual).toBe(expected);
  });

  it('should return white for NAV green 800', () => {
    expect.assertions(1);

    const expected = FontColor.WHITE;
    const actual = getFontColor(rgbToHex(NAV_COLORS.green[800]));
    expect(actual).toBe(expected);
  });
});

const rgbToHex = (rgbString: string) =>
  '#' +
  rgbString
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map((x) => Number.parseInt(x, 10))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
