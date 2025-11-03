import { type HeadingProps, HelpText, type HelpTextProps } from '@navikt/ds-react';
import { styled } from 'styled-components';
import { StyledHeading } from '../../common/styled-components';

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
    <Container size={size}>
      {children}
      <HelpText placement={placement}>{helpText}</HelpText>
    </Container>
  );

const Container = styled(StyledHeading)`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;
