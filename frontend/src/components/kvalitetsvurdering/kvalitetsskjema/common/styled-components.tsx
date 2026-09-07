import { HStack, RadioGroup, type RadioGroupProps } from '@navikt/ds-react';
import type { PropsWithChildren } from 'react';

export const RadioButtonsRow = ({ children }: PropsWithChildren) => <HStack gap="space-16">{children}</HStack>;

export const SubSection = ({ children }: PropsWithChildren) => <div className="mb-4 ml-8">{children}</div>;

export const StyledRadioGroup = ({ className, ...props }: RadioGroupProps) => (
  <RadioGroup {...props} className={`mb-4 ${className ?? ''}`} />
);
