import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDefaultQuery } from '../../../hooks/use-default-query-params';
import { useUserHasRole } from '../../../hooks/use-user-access';

export const BackLink = () => {
  const location = useLocation();
  const { isLoading, roles } = useUserHasRole();
  const defaultQuery = useDefaultQuery();

  if (isLoading) {
    return null;
  }

  const previousPage = location.state;

  if (typeof previousPage === 'string') {
    return (
      <NavLink to={previousPage} className="knapp knapp--mini footer-button">
        Tilbake
      </NavLink>
    );
  }

  if (roles.ROLE_KAKA_KVALITETSTILBAKEMELDINGER) {
    return (
      <NavLink to={`/tilbakemeldinger?${defaultQuery}`} className="knapp knapp--mini footer-button">
        Tilbake
      </NavLink>
    );
  }

  return (
    <NavLink to="/kvalitetsvurderinger" className="knapp knapp--mini footer-button">
      Tilbake
    </NavLink>
  );
};
