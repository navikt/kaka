import React from 'react';
import styled from 'styled-components';
import { PageWrapper } from '../../pages/page-wrapper';
import { Kvalitetsskjema } from './kvalitetsskjema/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsregistrering = () => (
  <PageWrapper>
    <StyledKvalitetsregistrering>
      <Saksdata />
      <Kvalitetsskjema />
    </StyledKvalitetsregistrering>
  </PageWrapper>
);

const StyledKvalitetsregistrering = styled.section`
  padding-left: 1em;
`;
