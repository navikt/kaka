import { StyledHeading } from '@app/components/kvalitetsvurdering/kvalitetsskjema/common/styled-components';
import { type HeadingProps, HelpText, type HelpTextProps } from '@navikt/ds-react';

interface Props {
  children: string;
  helpText: string | null;
  placement?: HelpTextProps['placement'];
  size?: HeadingProps['size'];
}

export const HeadingWithHelpText = ({ children, helpText, size = 'small', placement = 'right' }: Props) =>
  helpText === null ? (
    <StyledHeading size="small">{children}</StyledHeading>
  ) : (
    <StyledHeading size={size} className="flex-row">
      {children}
      <HelpText placement={placement}>{helpText}</HelpText>
    </StyledHeading>
  );
