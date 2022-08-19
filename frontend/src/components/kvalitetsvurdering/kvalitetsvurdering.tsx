import React from 'react';
import styled from 'styled-components';
import { PageWrapper } from '../../pages/page-wrapper';
import { Kvalitetsskjema } from './kvalitetsskjema/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsvurdering = () => (
  <PageWrapper>
    <StyledKvalitetsvurdering>
      <Saksdata />
      <Kvalitetsskjema />
    </StyledKvalitetsvurdering>
  </PageWrapper>
);

const StyledKvalitetsvurdering = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding-bottom: 64px;
`;
