import { Heading, HelpText, type HelpTextProps, HStack } from '@navikt/ds-react';

interface Props {
  children: React.ReactNode;
}

interface CardTitleWithExplainerProps extends Props, Pick<HelpTextProps, 'placement'> {
  helpText: string;
}

export const CardTitleWithExplainer = ({ children, helpText, placement }: CardTitleWithExplainerProps) => (
  <Heading size="medium" align="center">
    <HStack gap="2" justify="center" align="center">
      {children}
      <HelpText placement={placement}>{helpText}</HelpText>
    </HStack>
  </Heading>
);
