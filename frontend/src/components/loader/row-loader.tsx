import { Loader } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';

interface LoaderProps {
  children: string;
}

export const RowLoader = ({ children }: LoaderProps): JSX.Element => (
  <Container>
    <Loader />
    <span>{children}</span>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
