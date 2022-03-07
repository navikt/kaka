import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDefaultQueryTilbakemeldinger } from '../../../hooks/use-default-query-params';
import { useHasRole } from '../../../hooks/use-has-role';
import { Role } from '../../../types/user';

export const BackLink = () => {
  const location = useLocation();
  const isVedtaksinstansleder = useHasRole(Role.ROLE_VEDTAKSINSTANS_LEDER);
  const tilbakemeldingerQuery = useDefaultQueryTilbakemeldinger();

  const previousPage = location.state;

  if (typeof previousPage === 'string') {
    return (
      <NavLink to={previousPage} className="knapp knapp--mini footer-button">
        Tilbake
      </NavLink>
    );
  }

  if (isVedtaksinstansleder) {
    return (
      <NavLink to={`/tilbakemeldinger?${tilbakemeldingerQuery}`} className="knapp knapp--mini footer-button">
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
