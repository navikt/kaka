// eslint-disable-next-line import/no-unused-modules
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
