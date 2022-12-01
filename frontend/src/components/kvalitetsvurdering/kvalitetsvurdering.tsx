import React from 'react';
import styled from 'styled-components';
import { useSaksdata } from '../../hooks/use-saksdata';
import { PageWrapper } from '../../pages/page-wrapper';
import { KvalitetsvurderingVersion } from '../../types/saksdata';
import { KvalitetsskjemaV1 } from './kvalitetsskjema/v1/kvalitetsskjema';
import { KvalitetsskjemaV2 } from './kvalitetsskjema/v2/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsvurdering = () => {
  const { data: saksdata } = useSaksdata();

  return (
    <PageWrapper>
      <StyledKvalitetsvurdering>
        <Saksdata />
        <Kvalitetsskjema version={saksdata?.kvalitetsvurderingReference.version} />
      </StyledKvalitetsvurdering>
    </PageWrapper>
  );
};

interface KvalitetsskjemaVersionProps {
  version: KvalitetsvurderingVersion | undefined;
}

const Kvalitetsskjema = ({ version }: KvalitetsskjemaVersionProps) => {
  switch (version) {
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
`;
