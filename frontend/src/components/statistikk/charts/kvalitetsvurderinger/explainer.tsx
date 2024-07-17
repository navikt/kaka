import { HelpText, HelpTextProps } from '@navikt/ds-react';
import { styled } from 'styled-components';
import { CardTitle } from '@app/styled-components/cards';
import { ChartTitle } from '../styled-components';

interface Props {
  children: React.ReactNode;
}

export const TitleWithExplainer = ({ children }: Props) => (
  <StyledHeading>
    <span>{children}</span>
    <HelpText>
      <HelpTextContent>
        En sak kan ha ett eller flere avvik. Prosenten er regnet ut fra totalt antall kvalitetsvurderte saker.
      </HelpTextContent>
    </HelpText>
  </StyledHeading>
);

const StyledHeading = styled(ChartTitle)`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
`;

const HelpTextContent = styled.div`
  text-align: left;
  // https://github.com/floating-ui/floating-ui/issues/2338
  width: 350px;
`;

interface CardTitleWithExplainerProps extends Props, Pick<HelpTextProps, 'placement'> {
  helpText: string;
}

export const CardTitleWithExplainer = ({ children, helpText, placement }: CardTitleWithExplainerProps) => (
  <StyledCardTitle>
    <span>{children}</span>
    <HelpText placement={placement}>
      <HelpTextContent>{helpText}</HelpTextContent>
    </HelpText>
  </StyledCardTitle>
);

const StyledCardTitle = styled(CardTitle)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
