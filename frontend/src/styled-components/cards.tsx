import { Heading } from '@navikt/ds-react';
import type { ComponentProps, PropsWithChildren } from 'react';

const BaseCard = ({ className, ...props }: ComponentProps<'section'>) => (
  <section className={`shadow-ax-dialog rounded p-4 ${className ?? ''}`} {...props} />
);

export const FullWidthStickyContainer = ({ children }: PropsWithChildren) => (
  <div className="sticky top-0 z-3 w-full">{children}</div>
);

export const StatsContainer = ({ children }: PropsWithChildren) => (
  <BaseCard className="bg-ax-bg-default mx-auto flex h-fit w-fit flex-row flex-wrap justify-center gap-8 max-[1100px]:static">
    {children}
  </BaseCard>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <Heading size="medium" align="center">
    {children}
  </Heading>
);
