import { AppTheme, useAppTheme } from '@app/app-theme';
import { DARK } from '@app/components/statistikk/colors/dark';
import { LIGHT } from '@app/components/statistikk/colors/light';
import type { ColorToken } from '@app/components/statistikk/colors/token-name';

export const getColorMap = (theme: AppTheme) => (theme === AppTheme.DARK ? DARK : LIGHT);
export const useColorMap = () => getColorMap(useAppTheme());

export const getColorFromTheme = (tokenName: ColorToken, theme: AppTheme): string => {
  switch (theme) {
    case AppTheme.DARK:
      return DARK[tokenName];
    case AppTheme.LIGHT:
      return LIGHT[tokenName];
  }
};

export const useColor = (tokenName: ColorToken): string => getColorFromTheme(tokenName, useAppTheme());
