import { LOCALE } from '@app/domain/intl';
import { toPercent } from '@app/domain/number';
import { getFontColor } from '@app/functions/get-font-color';
import { Chart, type TooltipCallbacks } from 'chart.js';

export type GetAbsoluteValue = (datasetIndex: number, dataIndex: number) => [number, number];

export const useBarTooltipText = (getAbsoluteValue: GetAbsoluteValue, unit = 'stk') => {
  const renderBarText = (ctx: CanvasRenderingContext2D) => {
    const chart = Chart.getChart(ctx);

    if (typeof chart === 'undefined') {
      return;
    }

    ctx.textAlign = 'center';
    ctx.fontKerning = 'normal';
    ctx.font = 'normal 16px "Source Sans Pro", Arial, sans-serif';
    const defaultOperation = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = 'overlay';

    for (let i = 0; i < chart.data.datasets.length; i++) {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const props = bar.getProps(['height', 'width', 'horizontal', 'options', '$context'], true);

        if (typeof props.$context === 'object' && props.$context.mode === 'hide') {
          return;
        }

        const [sum, percent] = getAbsoluteValue(i, index);

        ctx.fillStyle = getFontColor(props.options.backgroundColor);

        if (percent === 0 || typeof props.width !== 'number') {
          return;
        }

        if (props.horizontal === true) {
          const line2 = `${sum.toLocaleString(LOCALE)} ${unit}`;

          if (ctx.measureText(line2).width > props.width) {
            return;
          }

          const line1 = toPercent(percent / 100);

          if (ctx.measureText(line1).width > props.width) {
            return;
          }

          const x = bar.x - props.width / 2;

          ctx.fillText(line1, x, bar.y - 3, props.width);
          ctx.fillText(line2, x, bar.y + 13, props.width);

          return;
        }

        if (typeof props.height === 'number' && props.height >= 28) {
          const y = bar.y + props.height / 2;

          ctx.fillText(toPercent(percent / 100), bar.x, y - 6, props.width);
          ctx.fillText(`${sum.toLocaleString(LOCALE)} ${unit}`, bar.x, y + 10, props.width);
        }
      });
    }

    ctx.globalCompositeOperation = defaultOperation;
  };

  const tooltipCallback: TooltipCallbacks<'bar'>['label'] = ({ datasetIndex, dataIndex, dataset }) => {
    const [sum, percent] = getAbsoluteValue(datasetIndex, dataIndex);

    return `${dataset.label ?? 'Ukjent'}: ${toPercent(percent / 100)} (${sum.toLocaleString(LOCALE)} ${unit})`;
  };

  return { renderBarText, tooltipCallback };
};
