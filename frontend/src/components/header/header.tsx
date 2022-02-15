import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useIndexPath } from '../../hooks/use-index-path';
import { UserMenu } from '../user-menu/user-menu';
import { VersionCheckerStatus } from '../version-checker/version-checker-status';
import { HomeIcon } from './home-icon';

export const Header = () => {
  const path = useIndexPath();

  return (
    <StyledHeader>
      <StyledLogo to={path}>
        <HomeIcon />
        <StyledLabel>KAKA</StyledLabel>
      </StyledLogo>
      <VersionCheckerStatus />
      <UserMenu />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  padding: 0 1.5rem;
  background: #3e3832;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
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
