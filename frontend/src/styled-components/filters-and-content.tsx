import type { PropsWithChildren } from 'react';

export const FiltersAndContentContainer = ({ children }: PropsWithChildren) => (
  <div className="flex w-full grow max-[1100px]:block max-[1100px]:flex-col max-[1100px]:overflow-y-auto">
    {children}
  </div>
);

export const FilterSection = ({ children }: PropsWithChildren) => (
  <div className="flex h-full w-105 shrink-0 flex-col gap-4 overflow-y-auto border-ax-border-neutral-subtle border-r p-4 max-[1100px]:h-fit max-[1100px]:w-full max-[1100px]:overflow-y-hidden max-[1100px]:border-r-0">
    {children}
  </div>
);
