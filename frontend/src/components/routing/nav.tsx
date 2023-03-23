import {
  BarChartFillIcon,
  BarChartIcon,
  LineGraphStackedIcon,
  ListIcon,
  PieChartFillIcon,
  PieChartIcon,
  TasklistIcon,
} from '@navikt/aksel-icons';
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import {
  useDefaultQueryAapen,
  useDefaultQueryComparison,
  useDefaultQueryLeder,
  useDefaultQueryMin,
  useDefaultQueryTilbakemeldinger,
  useDefaultQueryTotal,
} from '../../hooks/use-default-query-params';
import { useUserHasRole } from '../../hooks/use-user-access';

export const Nav = () => {
  const defaultQueryAapen = useDefaultQueryAapen();
  const defaultQueryLeder = useDefaultQueryLeder();
  const defaultQueryTotal = useDefaultQueryTotal();
  const defaultQueryMin = useDefaultQueryMin();
  const defaultQueryTilbakemeldinger = useDefaultQueryTilbakemeldinger();
  const defauleQueryComparison = useDefaultQueryComparison();

  const { isLoading, roles } = useUserHasRole();

  if (isLoading) {
    return null;
  }

  return (
    <StyledNav role="navigation" aria-label="Meny" data-testid="kaka-nav">
      <StyledNavLinkList>
        <NavItem to={`/statistikk/aapen?${defaultQueryAapen}`} testId="statistikk-aapen-nav-link" hasAccess>
          <BarChartIcon /> Åpen statistikk
        </NavItem>

        <NavItem
          to={`/statistikk/total?${defaultQueryTotal}`}
          testId="statistikk-total-nav-link"
          hasAccess={roles.ROLE_KAKA_TOTALSTATISTIKK}
        >
          <BarChartFillIcon /> Totalstatistikk
        </NavItem>

        <NavItem
          to={`/statistikk/leder?${defaultQueryLeder}`}
          testId="statistikk-leder-nav-link"
          hasAccess={roles.ROLE_KAKA_LEDERSTATISTIKK}
        >
          <PieChartFillIcon /> Lederstatistikk
        </NavItem>

        <NavItem
          to={`/statistikk/min?${defaultQueryMin}`}
          testId="statistikk-min-nav-link"
          hasAccess={roles.ROLE_KAKA_KVALITETSVURDERING}
        >
          <PieChartIcon /> Min statistikk
        </NavItem>

        <NavItem
          to="/kvalitetsvurderinger"
          testId="kvalitetsvurdering-nav-link"
          hasAccess={roles.ROLE_KAKA_KVALITETSVURDERING}
        >
          <ListIcon /> Kvalitetsvurderinger
        </NavItem>

        <NavItem
          to={`/tilbakemeldinger?${defaultQueryTilbakemeldinger}`}
          testId="tilbakemeldinger-nav-link"
          hasAccess={roles.ROLE_KAKA_KVALITETSTILBAKEMELDINGER}
        >
          <TasklistIcon /> Tilbakemeldinger
        </NavItem>
        <NavItem
          to={`/sammenlikning?${defauleQueryComparison}`}
          testId="sammenlikning-nav-link"
          hasAccess={roles.ROLE_KAKA_TOTALSTATISTIKK}
        >
          <LineGraphStackedIcon /> Sammenlikning
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
  padding-top: 16px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;

const StyledNavLinkList = styled.ul`
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;
  padding: 0;
  padding-top: 0;
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
