import { describe, expect, it } from 'bun:test';
import { AppTheme } from '@app/app-theme';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { DARK_COLOR, getFontColor, LIGHT_COLOR } from './get-font-color';

describe('get font color for background', () => {
  it('should return black for white', () => {
    expect.assertions(1);

    const expected = DARK_COLOR;
    const actual = getFontColor('#FFFFFF');
    expect(actual).toBe(expected);
  });

  it('should return white for black', () => {
    expect.assertions(1);

    const expected = LIGHT_COLOR;
    const actual = getFontColor('#000000');
    expect(actual).toBe(expected);
  });

  it('should return white for NAV blue 900', () => {
    expect.assertions(1);

    const expected = LIGHT_COLOR;
    const actual = getFontColor(getColorFromTheme(ColorToken.Accent900, AppTheme.LIGHT));
    expect(actual).toBe(expected);
  });

  it('should return white for NAV blue 800', () => {
    expect.assertions(1);

    const expected = LIGHT_COLOR;
    const actual = getFontColor(getColorFromTheme(ColorToken.Accent800, AppTheme.LIGHT));
    expect(actual).toBe(expected);
  });

  it('should return white for NAV green 800', () => {
    expect.assertions(1);

    const expected = LIGHT_COLOR;
    const actual = getFontColor(getColorFromTheme(ColorToken.Success800, AppTheme.LIGHT));
    expect(actual).toBe(expected);
  });
});
