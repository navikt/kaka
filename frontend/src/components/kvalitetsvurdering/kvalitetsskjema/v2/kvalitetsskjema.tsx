import { BrukAvRaadgivendeLege } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/bruk-av-raadgivende';
import { Utredningen } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/utredningen';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { UtfallEnum } from '@app/types/utfall';
import { Heading, Loader, VStack } from '@navikt/ds-react';
import { Annet } from './annet/annet';
import { useKvalitetsvurderingV2 } from './common/use-kvalitetsvurdering-v2';
import { Klageforberedelsen } from './klageforberedelsen/klageforberedelsen';
import { Vedtaket } from './vedtaket/vedtaket';

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
    saksdata.utfallId === UtfallEnum.HENLAGT ||
    isError
  ) {
    return null;
  }

  return (
    <VStack as="section" gap="space-32" data-testid="kvalitetsskjema">
      <Heading level="1" size="medium">
        Kvalitetsvurdering
      </Heading>
      <Klageforberedelsen />
      <Utredningen />
      <Vedtaket />
      <BrukAvRaadgivendeLege />
      <Annet />
    </VStack>
  );
};
