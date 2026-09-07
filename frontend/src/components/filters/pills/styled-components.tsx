import { HStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';

export const PillContainer = ({ children }: PropsWithChildren) => (
  <HStack as="ul" gap="space-8" className="m-0 list-none p-0">
    {children}
  </HStack>
);
