import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  id: string;
}

export const OpenKvalitetsregistrering = ({ id }: Props) => (
  <NavLink
    className="knapp knapp--hoved"
    to={`/kvalitetsregistreringer/${id}`}
    data-testid="kvalitetsregistreringer-open-link"
    data-saksdata-id={id}
  >
    Åpne
  </NavLink>
);
