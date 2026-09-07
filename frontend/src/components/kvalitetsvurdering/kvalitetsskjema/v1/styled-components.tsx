import { HStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';

export const RadioButtonsRow = ({ children }: PropsWithChildren) => (
  <HStack justify="space-between" width="300px">
    {children}
  </HStack>
);
