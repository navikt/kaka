import { AppTheme, appThemeStore, getAppTheme } from '@app/app-theme';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
const DARK_ON_LIGHT_TEXT_COLOR = getColorFromTheme(ColorToken.Neutral1000, AppTheme.LIGHT);
const LIGHT_ON_DARK_TEXT_COLOR = getColorFromTheme(ColorToken.Neutral1000, AppTheme.DARK);

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend);

Chart.defaults.font = {
  ...Chart.defaults.font,
  size: 18,
  family: '"Source Sans Pro", Arial, sans-serif',
};
Chart.defaults.responsive = true;
Chart.defaults.scale.grid.display = false;
Chart.defaults.scale.ticks.font = { ...Chart.defaults.scale.ticks.font, size: 16 };
Chart.defaults.plugins.title.font = { ...Chart.defaults.plugins.title.font, size: 22, weight: 'bold' };
Chart.defaults.plugins.legend.labels.font = { ...Chart.defaults.plugins.legend.labels.font, size: 16 };
Chart.defaults.plugins.tooltip.titleFont = { ...Chart.defaults.plugins.tooltip.titleFont, size: 16 };
Chart.defaults.plugins.tooltip.bodyFont = { ...Chart.defaults.plugins.tooltip.bodyFont, size: 16 };
Chart.defaults.plugins.tooltip.footerFont = { ...Chart.defaults.plugins.tooltip.footerFont, size: 16 };
Chart.defaults.elements.bar.borderRadius = 4;
Chart.defaults.elements.line.tension = 0.3;
Chart.defaults.datasets.bar.maxBarThickness = 80;
Chart.defaults.animation = { ...Chart.defaults.animation, duration: 200, easing: 'easeOutQuart' };
Chart.defaults.color = getAppTheme() === AppTheme.DARK ? LIGHT_ON_DARK_TEXT_COLOR : DARK_ON_LIGHT_TEXT_COLOR;

appThemeStore.subscribe((theme) => {
  switch (theme) {
    case AppTheme.DARK:
      Chart.defaults.color = LIGHT_ON_DARK_TEXT_COLOR;
      break;
    case AppTheme.LIGHT:
      Chart.defaults.color = DARK_ON_LIGHT_TEXT_COLOR;
      break;
  }
});
