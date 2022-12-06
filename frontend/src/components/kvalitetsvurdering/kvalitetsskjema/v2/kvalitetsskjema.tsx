import { Heading, Loader } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { useSaksdata } from '../../../../hooks/use-saksdata';
import { UtfallEnum } from '../../../../types/utfall';
import { Annet } from './annet';
import { BrukAvRaadgivendeLege } from './bruk-av-raadgivende';
import { useKvalitetsvurderingV2 } from './common/use-kvalitetsvurdering-v2';
import { Klageforberedelsen } from './klageforberedelsen';
import { Utredningen } from './utredningen';
import { Vedtaket } from './vedtaket';

export const KvalitetsskjemaV2 = () => {
  const { data: saksdata, isLoading, isError } = useSaksdata();
  const { isLoading: kvalitetsvurderingIsLoading } = useKvalitetsvurderingV2();

  if (isLoading || kvalitetsvurderingIsLoading) {
    return <Loader size="3xlarge" />;
  }

  if (
    typeof saksdata === 'undefined' ||
    saksdata.utfallId === UtfallEnum.TRUKKET ||
    saksdata.utfallId === UtfallEnum.RETUR ||
    saksdata.utfallId === UtfallEnum.UGUNST ||
    isError
  ) {
    return null;
  }

  return (
    <StyledKvalitetsskjema data-testid="kvalitetsskjema">
      <Heading level="1" size="medium">
        Kvalitetsvurdering
      </Heading>
      <Klageforberedelsen />
      <Utredningen />
      <Vedtaket />
      <BrukAvRaadgivendeLege />
      <Annet />
    </StyledKvalitetsskjema>
  );
};

const StyledKvalitetsskjema = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;
