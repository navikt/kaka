import React from 'react';
import styled from 'styled-components';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { PageWrapper } from '@app/pages/page-wrapper';
import { KvalitetsskjemaV1 } from './kvalitetsskjema/v1/kvalitetsskjema';
import { KvalitetsskjemaV2 } from './kvalitetsskjema/v2/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsvurdering = () => (
  <PageWrapper>
    <StyledKvalitetsvurdering>
      <Saksdata />
      <Kvalitetsskjema />
    </StyledKvalitetsvurdering>
  </PageWrapper>
);

const Kvalitetsskjema = () => {
  const { data } = useSaksdata();

  switch (data?.kvalitetsvurderingReference.version) {
    case 1:
      return <KvalitetsskjemaV1 />;
    case 2:
      return <KvalitetsskjemaV2 />;
    default:
      return null;
  }
};

const StyledKvalitetsvurdering = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding-bottom: 64px;
  width: 800px;
`;
