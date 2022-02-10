import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  id: string;
}

export const OpenKvalitetsvurdering = ({ id }: Props) => (
  <NavLink
    className="knapp knapp--hoved"
    to={id}
    state={`${window.location.pathname}${window.location.search}`}
    data-testid="kvalitetsvurderinger-open-link"
    data-saksdata-id={id}
  >
    Åpne
  </NavLink>
);
