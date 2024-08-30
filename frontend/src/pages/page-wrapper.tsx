import { Nav } from '@app/components/routing/nav';
import { GAP } from '@app/styled-components/constants';
import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: Props) => (
  <>
    <Nav />
    <StyledPageWrapper>
      <StyledPagePadding>{children}</StyledPagePadding>
    </StyledPageWrapper>
  </>
);

const StyledPageWrapper = styled.article`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const StyledPagePadding = styled.div`
  padding-left: ${GAP}px;
  padding-right: ${GAP}px;
  flex-grow: 1;
  display: flex;
`;
