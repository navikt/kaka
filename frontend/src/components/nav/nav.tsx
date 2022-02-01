import dayjs from 'dayjs';
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { useHasAnyOfRoles } from '../../hooks/use-has-role';
import { useKodeverkValue } from '../../hooks/use-kodeverk-value';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { Role } from '../../types/user';
import { QueryParams } from '../oversikt/types';

const NOW = dayjs();
const FORMAT = 'YYYY-MM-DD';

const useEnhetQueryParam = () => {
  const { data } = useGetUserDataQuery();
  const vedtaksinstansenheter = useKodeverkValue('enheter') ?? [];
  const klageenheter = useKodeverkValue('klageenheter') ?? [];

  const ansattEnhetId: string | undefined = data?.ansattEnhet?.navn;

  if (typeof ansattEnhetId === 'undefined') {
    return '';
  }

  if (klageenheter.some(({ navn }) => navn === ansattEnhetId)) {
    return `${QueryParams.KLAGEENHETER}=${ansattEnhetId}`;
  }

  if (vedtaksinstansenheter.some(({ navn }) => navn === ansattEnhetId)) {
    return `${QueryParams.ENHETER}=${ansattEnhetId}`;
  }

  return '';
};

export const Nav = () => {
  const enhetQueryParam = useEnhetQueryParam();

  const fromDate = NOW.subtract(30, 'day').format(FORMAT);
  const toDate = NOW.format(FORMAT);

  const fromMonth = NOW.subtract(1, 'month').format('YYYY-MM');
  const toMonth = NOW.subtract(1, 'month').format('YYYY-MM');

  return (
    <StyledNav role="navigation" aria-label="Meny" data-testid="kaka-nav">
      <StyledNavLinkList>
        <NavItem
          to={`/oversikt/total?${enhetQueryParam}&${QueryParams.FROM_DATE}=${fromDate}&${QueryParams.TO_DATE}=${toDate}`}
          testId="oversikt-total-nav-link"
        >
          Totaloversikt
        </NavItem>
        <NavItem
          to={`/oversikt/leder?${QueryParams.FROM_MONTH}=${fromMonth}&${QueryParams.TO_MONTH}=${toMonth}`}
          testId="oversikt-leder-nav-link"
          roles={[Role.ROLE_KLAGE_LEDER]}
        >
          Lederoversikt
        </NavItem>
        <NavItem
          to="/kvalitetsregistreringer"
          testId="kvalitetsvurdering-nav-link"
          roles={[Role.ROLE_KLAGE_SAKSBEHANDLER]}
        >
          Kvalitetsvurdering
        </NavItem>
      </StyledNavLinkList>
    </StyledNav>
  );
};

interface NavItemProps extends NavLinkProps {
  testId?: string;
  roles?: Role[];
}

const NavItem = ({ testId, roles, ...props }: NavItemProps) => {
  const hasRole = useHasAnyOfRoles(roles);

  if (!hasRole) {
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
  top: 0;
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
