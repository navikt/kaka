import React from 'react';
import styled from 'styled-components';
import { Nav } from '../components/nav/nav';

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
`;

const StyledPagePadding = styled.div`
  padding-left: 2em;
  padding-right: 2em;
`;
