import { HeadingProps, HelpText, HelpTextProps } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { StyledHeading } from './styled-components';

interface Props {
  children: string;
  helpText: string;
  placement?: HelpTextProps['placement'];
  size?: HeadingProps['size'];
}

export const HeadingWithHelpText = ({ children, helpText, size = 'small', placement = 'right' }: Props) => (
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
