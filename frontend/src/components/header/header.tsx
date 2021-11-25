import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HomeIcon } from './home-icon';

export const Header = () => (
  <StyledHeader>
    <StyledLogo to={'/oppgaver/1'}>
      <HomeIcon />
      <StyledLabel>KAKA</StyledLabel>
    </StyledLogo>
  </StyledHeader>
);

const StyledHeader = styled.header`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  padding: 0 1.5rem;
  background: #3e3832;
  align-items: center;
`;

const StyledLogo = styled(NavLink)`
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.span`
  margin-left: 1em;
`;
