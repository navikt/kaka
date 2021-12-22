import React from 'react';
import styled from 'styled-components';
import { Download } from '../../icons/download';
import { useGetUserDataQuery } from '../../redux-api/metadata';

export const CsvExport = () => {
  const { data } = useGetUserDataQuery();

  if (typeof data === 'undefined' || !data.roller.includes('ROLE_KLAGE_LEDER')) {
    return null;
  }

  return (
    <StyledLink className="knapp knapp--mini" href="/some.csv" download="rapport">
      <span>Eksporter</span> <Download />
    </StyledLink>
  );
};

const StyledLink = styled.a`
  margin-top: 2em;
  display: block;
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
