import { Nav } from '@app/components/routing/nav';
import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export const StatisticsPageWrapper = ({ children }: Props) => (
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
  overflow: auto;
`;

const StyledPagePadding = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`;

export const KvalitetsvurderingPageWrapper = ({ children }: Props) => (
  <StyledKvalitetsvurderingPage>
    <Nav />
    {children}
  </StyledKvalitetsvurderingPage>
);

const StyledKvalitetsvurderingPage = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;
