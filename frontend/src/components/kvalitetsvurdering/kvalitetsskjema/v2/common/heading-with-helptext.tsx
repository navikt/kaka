import { Heading, type HeadingProps, HelpText, type HelpTextProps, HStack } from '@navikt/ds-react';

interface Props {
  children: string;
  helpText: string | null;
  placement?: HelpTextProps['placement'];
  size?: HeadingProps['size'];
}

export const HeadingWithHelpText = ({ children, helpText, size = 'small', placement = 'right' }: Props) =>
  helpText === null ? (
    <Heading size={size}>{children}</Heading>
  ) : (
    <Heading size={size}>
      <HStack as="span" align="center" gap="space-8">
        {children}
        <HelpText placement={placement}>{helpText}</HelpText>
      </HStack>
    </Heading>
  );
