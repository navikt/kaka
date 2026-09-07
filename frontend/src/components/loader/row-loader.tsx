import { HStack, Loader } from '@navikt/ds-react';

interface LoaderProps {
  children: string;
}

export const RowLoader = ({ children }: LoaderProps) => (
  <HStack align="center" gap="space-8">
    <Loader />
    <span>{children}</span>
  </HStack>
);
