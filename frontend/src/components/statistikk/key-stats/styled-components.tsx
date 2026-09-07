import { HStack } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';

export const KeyContent = ({ children }: PropsWithChildren) => <div className="text-center">{children}</div>;

export const KeyNumber = ({ children }: PropsWithChildren) => (
  <KeyContent>
    <span className="font-bold text-[32px]">{children}</span>
  </KeyContent>
);

export const RedKeyNumber = ({ children }: PropsWithChildren) => (
  <KeyContent>
    <span className="font-bold text-[32px] text-ax-text-danger-subtle">{children}</span>
  </KeyContent>
);

export const KeyLabelWithHelpText = ({ children }: PropsWithChildren) => (
  <HStack as="div" gap="space-8" className="text-center">
    {children}
  </HStack>
);

export const HelpTextContent = ({ children }: PropsWithChildren) => <div className="text-left">{children}</div>;
