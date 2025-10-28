import { Annet } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/annet/annet';
import { useKvalitetsvurderingV3 } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/common/use-kvalitetsvurdering-v3';
import { Saksbehandlingsreglene } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/saksbehandlingsreglene';
import { Særregelverket } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/særregelverket/særregelverket';
import { Trygdemedisin } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/trygdemedisin/trygdemedisin';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { UtfallEnum } from '@app/types/utfall';
import { Heading, Loader } from '@navikt/ds-react';
import { styled } from 'styled-components';

export const KvalitetsskjemaV3 = () => {
  const { data: saksdata, isLoading, isError } = useSaksdata();
  const { isLoading: kvalitetsvurderingIsLoading } = useKvalitetsvurderingV3();

  if (isLoading || kvalitetsvurderingIsLoading) {
    return <Loader size="3xlarge" />;
  }

  if (
    typeof saksdata === 'undefined' ||
    saksdata.utfallId === UtfallEnum.TRUKKET ||
    saksdata.utfallId === UtfallEnum.RETUR ||
    saksdata.utfallId === UtfallEnum.UGUNST ||
    saksdata.utfallId === UtfallEnum.HENLAGT ||
    isError
  ) {
    return null;
  }

  return (
    <StyledKvalitetsskjema data-testid="kvalitetsskjema">
      <Heading level="1" size="medium">
        Kvalitetsvurdering
      </Heading>
      <Særregelverket />
      <Saksbehandlingsreglene />
      <Trygdemedisin />
      <Annet />
    </StyledKvalitetsskjema>
  );
};

const StyledKvalitetsskjema = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;
