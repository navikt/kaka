import { HelpText, type HelpTextProps, HStack } from '@navikt/ds-react';

interface Props {
  children: React.ReactNode;
  helpText?: string;
  placement?: HelpTextProps['placement'];
}

export const ContainerWithHelpText = ({ children, helpText, placement = 'right' }: Props) => (
  <HStack gap="1" wrap={false} align="center" justify="start" className="w-min">
    <span className="whitespace-nowrap">{children}</span>
    {helpText !== undefined ? <HelpText placement={placement}>{helpText}</HelpText> : null}
  </HStack>
);
