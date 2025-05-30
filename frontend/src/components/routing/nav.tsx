import {
  useDefaultQueryAapen,
  useDefaultQueryComparison,
  useDefaultQueryLeder,
  useDefaultQueryMin,
  useDefaultQueryTilbakemeldinger,
  useDefaultQueryTotal,
} from '@app/hooks/use-default-query-params';
import { useUserAccess } from '@app/hooks/use-user-access';
import {
  BarChartFillIcon,
  BarChartIcon,
  BulletListIcon,
  LineGraphStackedIcon,
  PieChartFillIcon,
  PieChartIcon,
  TasklistIcon,
} from '@navikt/aksel-icons';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import { styled } from 'styled-components';

export const Nav = () => {
  const defaultQueryAapen = useDefaultQueryAapen();
  const defaultQueryLeder = useDefaultQueryLeder();
  const defaultQueryTotal = useDefaultQueryTotal();
  const defaultQueryMin = useDefaultQueryMin();
  const defaultQueryTilbakemeldinger = useDefaultQueryTilbakemeldinger();
  const defauleQueryComparison = useDefaultQueryComparison();

  const access = useUserAccess();

  return (
    <StyledNav aria-label="Meny" data-testid="kaka-nav">
      <StyledNavLinkList>
        <NavItem to={`/statistikk/aapen?${defaultQueryAapen}`} testId="statistikk-aapen-nav-link" hasAccess>
          <BarChartIcon aria-hidden /> Åpen statistikk
        </NavItem>

        <NavItem
          to={`/statistikk/total?${defaultQueryTotal}`}
          testId="statistikk-total-nav-link"
          hasAccess={access.KAKA_TOTALSTATISTIKK}
        >
          <BarChartFillIcon aria-hidden /> Totalstatistikk
        </NavItem>

        <NavItem
          to={`/statistikk/leder?${defaultQueryLeder}`}
          testId="statistikk-leder-nav-link"
          hasAccess={access.KAKA_LEDERSTATISTIKK}
        >
          <PieChartFillIcon aria-hidden /> Lederstatistikk
        </NavItem>

        <NavItem
          to={`/statistikk/min?${defaultQueryMin}`}
          testId="statistikk-min-nav-link"
          hasAccess={access.KAKA_KVALITETSVURDERING}
        >
          <PieChartIcon aria-hidden /> Min statistikk
        </NavItem>

        <NavItem
          to="/kvalitetsvurderinger"
          testId="kvalitetsvurdering-nav-link"
          hasAccess={access.KAKA_KVALITETSVURDERING}
        >
          <BulletListIcon aria-hidden /> Kvalitetsvurderinger
        </NavItem>

        <NavItem
          to={`/tilbakemeldinger?${defaultQueryTilbakemeldinger}`}
          testId="tilbakemeldinger-nav-link"
          hasAccess={access.KAKA_KVALITETSTILBAKEMELDINGER}
        >
          <TasklistIcon aria-hidden /> Tilbakemeldinger
        </NavItem>
        <NavItem
          to={`/sammenlikning?${defauleQueryComparison}`}
          testId="sammenlikning-nav-link"
          hasAccess={access.KAKA_TOTALSTATISTIKK}
        >
          <LineGraphStackedIcon aria-hidden /> Sammenlikning
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
