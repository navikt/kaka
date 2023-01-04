import { Header } from '@navikt/ds-react-internal';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useIndexPath } from '../../hooks/use-index-path';
import { UserMenu } from '../user-menu/user-menu';
import { VersionCheckerStatus } from '../version-checker/version-checker-status';

export const KakaHeader = () => {
  const path = useIndexPath();

  return (
    <StyledHeader>
      <Header.Title as={Link} to={path}>
        Kaka
      </Header.Title>
      <MainContent>
        <VersionCheckerStatus />
      </MainContent>
      <UserMenu />
    </StyledHeader>
  );
};

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const StyledHeader = styled(Header)`
  z-index: 11;
`;
