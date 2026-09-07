import { HGrid, HStack } from '@navikt/ds-react';
import type { ReactNode } from 'react';

export const StyledButtons = ({ children }: { children: ReactNode }) => (
  <HGrid columns="repeat(3, minmax(200px, max-content))" gap="space-16" width="100%">
    {children}
  </HGrid>
);

interface FooterProps {
  children: ReactNode;
  className: string;
  'data-testid'?: string;
}

export const Footer = ({ className, ...rest }: FooterProps) => (
  <HStack
    wrap={false}
    justify="space-between"
    align="center"
    paddingInline="space-16"
    paddingBlock="space-8"
    width="100%"
    className={`z-5 border-t ${className}`}
    {...rest}
  />
);
