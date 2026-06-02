import { formatFileName } from '@app/components/echarts/format';
import { renderChartToCanvas } from '@app/components/echarts/png-render';
import type { ECharts } from 'echarts/core';

interface DownloadOptions {
  fromDate: string;
  toDate: string;
}

/**
 * Downloads the ECharts chart as a high-resolution PNG image.
 */
export const downloadChartAsPng = async (
  chart: ECharts | null,
  titleElement: HTMLElement | null,
  descriptionElement: HTMLElement | null,
  options: DownloadOptions,
): Promise<void> => {
  const result = await renderChartToCanvas(chart, titleElement, descriptionElement);

  if (result === null) {
    return;
  }

  const { canvas, title } = result;

  const pngUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = formatFileName(title, 'png', options);
  link.href = pngUrl;
  link.click();
};
