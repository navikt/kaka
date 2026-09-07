import { HStack, VStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';

export const FilterPanelContainer = ({ children }: PropsWithChildren) => (
  <VStack gap="space-8" width="100%">
    {children}
  </VStack>
);

export const DateContainer = ({ children }: PropsWithChildren) => (
  <HStack wrap={false} align="center" gap="space-8">
    {children}
  </HStack>
);

export const StyledHr = () => <hr className="h-px w-full text-ax-border-neutral-subtle" />;
