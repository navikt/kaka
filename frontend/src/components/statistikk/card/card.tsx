import { Box } from '@navikt/ds-react';

interface Props {
  children: React.ReactNode;
  span?: number;
  colSpan?: number;
  className?: string;
}

export const Card = ({ children, span = 2, className = '' }: Props) => (
  <Box
    padding="space-16"
    shadow="dialog"
    background="neutral-soft"
    borderRadius="4"
    position="relative"
    style={{ gridRowEnd: `span ${span}` }}
    className={`flex flex-col ${className}`}
  >
    {children}
  </Box>
);
