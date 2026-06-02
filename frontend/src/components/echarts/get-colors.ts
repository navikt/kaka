import { AppTheme } from '@app/app-theme';
import { DARK } from '@app/components/echarts/dark';
import { LIGHT } from '@app/components/echarts/light';
import { SAKSTYPE_COLORS } from '@app/components/echarts/sakstype-colors';
import type { SakstypeEnum } from '@app/types/sakstype';

// Due to a bug in pie chart when hovering (emphasis) we have to hard code the colors instead of using tokens
export const getSakstypePieChartColor = (typeId: SakstypeEnum, theme: AppTheme): string => {
  switch (theme) {
    case AppTheme.LIGHT:
      return LIGHT[SAKSTYPE_COLORS[typeId]];
    case AppTheme.DARK:
      return DARK[SAKSTYPE_COLORS[typeId]];
  }
};

export const getSakstypeColor = (typeId: SakstypeEnum) => `var(--ax-${SAKSTYPE_COLORS[typeId]})`;
