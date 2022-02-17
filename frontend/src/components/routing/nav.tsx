import { Data, DataFilled, DivideFilled, List, Task } from '@navikt/ds-icons';
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import {
  useDefaultQueryLeder,
  useDefaultQueryOpen,
  useDefaultQueryTilbakemeldinger,
  useDefaultQueryTotal,
} from '../../hooks/use-default-query-params';
import { useUserAccess } from '../../hooks/use-user-access';
import { Page, hasPageAccess } from '../routing/access-roles';

export const Nav = () => {
  const openQuery = useDefaultQueryOpen();
  const totalQuery = useDefaultQueryTotal();
  const lederQuery = useDefaultQueryLeder();
  const queryTilbakemeldinger = useDefaultQueryTilbakemeldinger();
  const { isLoading, access } = useUserAccess();

  if (isLoading || typeof access === 'undefined') {
    return null;
  }

  return (
    <StyledNav role="navigation" aria-label="Meny" data-testid="kaka-nav">
      <StyledNavLinkList>
        <NavItem to={`/statistikk/aapen?${openQuery}`} testId="statistikk-aapen-nav-link" hasAccess>
          <Data /> Åpen statistikk
        </NavItem>

        <NavItem
          to={`/statistikk/total?${totalQuery}`}
          testId="statistikk-total-nav-link"
          hasAccess={hasPageAccess(Page.TOTALSTATISTIKK, access)}
        >
          <DataFilled /> Totalstatistikk
        </NavItem>

        <NavItem
          to={`/statistikk/leder?${lederQuery}`}
          testId="statistikk-leder-nav-link"
          hasAccess={hasPageAccess(Page.LEDERSTATISTIKK, access)}
        >
          <DivideFilled /> Lederstatistikk
        </NavItem>

        <NavItem
          to="/kvalitetsvurderinger"
          testId="kvalitetsvurdering-nav-link"
          hasAccess={hasPageAccess(Page.KVALITETSVURDERINGER, access)}
        >
          <List /> Kvalitetsvurderinger
        </NavItem>

        <NavItem
          to={`/tilbakemeldinger?${queryTilbakemeldinger}`}
          testId="tilbakemeldinger-nav-link"
          hasAccess={hasPageAccess(Page.TILBAKEMELDINGER, access)}
        >
          <Task /> Tilbakemeldinger
        </NavItem>
      </StyledNavLinkList>
    </StyledNav>
  );
};

interface NavItemProps extends NavLinkProps {
  hasAccess: boolean;
  testId?: string;
}

const NavItem = ({ hasAccess, testId, ...props }: NavItemProps) => {
  if (!hasAccess) {
    return null;
  }

  return (
    <StyledNavListItem>
      <StyledNavLink {...props} data-testid={testId} />
    </StyledNavListItem>
  );
};

const StyledNav = styled.nav`
  padding-top: 1em;
  position: sticky;
  top: 48px;
  background-color: white;
  z-index: 10;
`;

const StyledNavLinkList = styled.ul`
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;
  padding: 0;
  padding-top: 5px;
  margin: 0 1em;
  border-bottom: 1px solid #3e3832;
`;

const StyledNavListItem = styled.li`
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  width: 100%;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  color: #54483f;
  border-bottom: 5px solid transparent;
  margin: 0;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 16px;
  padding-right: 16px;
  word-break: keep-all;
  white-space: nowrap;

  &.active,
  &:hover {
    text-decoration: none;
    color: #0067c5;
    border-bottom: 5px solid #0067c5;
  }
`;
