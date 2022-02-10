import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import {
  useDefaultQueryLeder,
  useDefaultQueryOpen,
  useDefaultQueryTilbakemeldinger,
  useDefaultQueryTotal,
} from '../../hooks/use-default-query-params';
import { useHasAccess } from '../../hooks/use-has-access';
import { Role } from '../../types/user';
import { ACCESS_ROLES } from './access-roles';

export const Nav = () => {
  const openQuery = useDefaultQueryOpen();
  const totalQuery = useDefaultQueryTotal();
  const lederQuery = useDefaultQueryLeder();
  const queryTilbakemeldinger = useDefaultQueryTilbakemeldinger();

  return (
    <StyledNav role="navigation" aria-label="Meny" data-testid="kaka-nav">
      <StyledNavLinkList>
        <NavItem to={`/statistikk/aapen?${openQuery}`} testId="statistikk-open-nav-link">
          Åpen statistikk
        </NavItem>

        <NavItem
          to={`/statistikk/total?${totalQuery}`}
          testId="statistikk-total-nav-link"
          roles={ACCESS_ROLES.TOTALSTATISTIKK}
        >
          Totalstatistikk
        </NavItem>

        <NavItem
          to={`/statistikk/leder?${lederQuery}`}
          testId="statistikk-leder-nav-link"
          roles={ACCESS_ROLES.LEDERSTATISTIKK}
        >
          Lederstatistikk
        </NavItem>

        <NavItem
          to="/kvalitetsvurderinger"
          testId="kvalitetsvurdering-nav-link"
          roles={ACCESS_ROLES.KVALITETSVURDERINGER}
        >
          Kvalitetsvurderinger
        </NavItem>

        <NavItem
          to={`/tilbakemeldinger?${queryTilbakemeldinger}`}
          testId="enhet-nav-link"
          roles={ACCESS_ROLES.TILBAKEMELDINGER}
        >
          Tilbakemeldinger
        </NavItem>
      </StyledNavLinkList>
    </StyledNav>
  );
};

interface NavItemProps extends NavLinkProps {
  testId?: string;
  roles?: Role[];
}

const NavItem = ({ testId, roles = [], ...props }: NavItemProps) => {
  const hasAccess = useHasAccess(roles);

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
  z-index: 5;
`;

const StyledNavLinkList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  padding-top: 5px;
  margin: 0 1em;
  border-bottom: 1px solid #3e3832;
`;

const StyledNavListItem = styled.li`
  min-width: 10em;
  text-align: center;
  padding-right: 1em;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  width: 100%;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
  color: #54483f;
  border-bottom: 5px solid transparent;
  margin: 0;
  padding: 0.25em 0 0.25em 0;
  word-break: keep-all;
  white-space: nowrap;
  min-width: 10em;

  &.active,
  &:hover {
    text-decoration: none;
    color: #0067c5;
    border-bottom: 5px solid #0067c5;
  }
`;
