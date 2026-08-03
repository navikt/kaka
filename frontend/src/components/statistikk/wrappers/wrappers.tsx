import { calculateSpan, GAP, PADDING, ROW_HEIGHT } from '@app/components/statistikk/wrappers/calculate-span';
import { Box } from '@navikt/ds-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

type ColSpan = 1 | 2 | 3;

interface Props {
  children: ReactNode;
  rowSpan?: number;
  colSpan?: ColSpan;
  className?: string;
}

// Only span multiple columns once the grid actually has that many columns (see charts-md/charts-lg breakpoints in ChartsWrapper)
const COL_SPAN_CLASS_NAMES: Record<number, string> = {
  2: 'charts-md:col-end-[span_2]',
  3: 'charts-lg:col-end-[span_3]',
};

export const Card = ({ rowSpan, ...props }: Props) =>
  rowSpan === undefined ? <CardDynamicHeight {...props} /> : <CardFixedHeight rowSpan={rowSpan} {...props} />;

interface CardFixedHeightProps extends Props {
  rowSpan: number;
}

const CardFixedHeight = ({ children, rowSpan, colSpan, className = '' }: CardFixedHeightProps) => (
  <Box
    shadow="dialog"
    background="neutral-soft"
    borderRadius="4"
    position="relative"
    style={{ gridRowEnd: `span ${rowSpan}`, padding: PADDING }}
    className={`flex flex-col ${colSpan === undefined ? '' : COL_SPAN_CLASS_NAMES[colSpan]} ${className}`}
  >
    {children}
  </Box>
);

interface CardDynamicHeightProps extends Props {
  rowSpan?: never;
}

const CardDynamicHeight = ({ children, className, colSpan }: CardDynamicHeightProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Recalculate when children changes
  useEffect(() => {
    if (ref.current) {
      setSpan(calculateSpan(ref.current.offsetHeight));
    }
  }, [children]);

  return (
    <Card rowSpan={span} colSpan={colSpan}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </Card>
  );
};

export const ChartsWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{ gap: `${GAP}px`, gridAutoRows: `${ROW_HEIGHT}px` }}
    className={'grid h-max w-full charts-lg:grid-cols-3 charts-md:grid-cols-2 grid-cols-1 p-6'}
  >
    {children}
  </div>
);

export const StatisticsWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="grow lg:overflow-auto">{children}</div>
);
