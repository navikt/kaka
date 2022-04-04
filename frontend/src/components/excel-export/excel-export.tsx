import { Download } from '@navikt/ds-icons';
import React from 'react';
import styled from 'styled-components';
import { useHasRole } from '../../hooks/use-has-role';
import { baseUrl } from '../../redux-api/common';
import { Role } from '../../types/user';

export const ExcelExport = () => {
  const isLeder = useHasRole(Role.ROLE_KLAGE_LEDER);

  if (!isLeder) {
    return null;
  }

  const url = `${baseUrl}api/kaka-api/export/excel`;

  return (
    <StyledLink className="knapp knapp--mini" href={url} download="rapport">
      <span>Eksporter</span> <Download />
    </StyledLink>
  );
};

const StyledLink = styled.a`
  margin-top: 2em;
  border: 2px solid #262626;
  background: #f1f1f1;
  color: #262626;
  display: flex;
  align-items: center;
  width: fit-content;

  :hover {
    color: #262626;
    background: #f9f9f9;
  }
`;
