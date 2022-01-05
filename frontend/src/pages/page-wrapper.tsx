import React from 'react';
import styled from 'styled-components';
import { Nav } from '../components/nav/nav';

interface Props {
  children: React.ReactNode;
  nav?: boolean;
}

export const PageWrapper = ({ children, nav = false }: Props) => (
  <>
    {nav && <Nav />}
    <StyledPageWrapper>{children}</StyledPageWrapper>
  </>
);

export const StyledPageWrapper = styled.article`
  padding-top: 2em;
  padding-left: 3em;
  min-height: 100%;
  padding-bottom: 80px;
`;
