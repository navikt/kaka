import { Tilbakekreving } from '@app/components/kvalitetsvurdering/saksdata/tilbakekreving';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { Heading, Loader, VStack } from '@navikt/ds-react';
import { FraVedtaksenhet } from './fra-vedtaksenhet';
import { Lovhjemmel } from './lovhjemmel/lovhjemmel';
import { MottattKlageinstans } from './mottatt-klageinstans';
import { MottattVedtaksinstans } from './mottatt-vedtaksinstans';
import { SakenGjelder } from './saken-gjelder';
import { Sakstype } from './sakstype';
import { UtfallResultat } from './utfall-resultat';
import { Ytelse } from './ytelse';

export const Saksdata = () => {
  const { isLoading } = useSaksdata();

  if (isLoading) {
    return <Loader size="3xlarge" />;
  }

  return (
    <VStack as="section" gap="space-32">
      <Heading level="1" size="medium">
        Saksdata
      </Heading>
      <Sakstype />
      <SakenGjelder />
      <Ytelse />
      <MottattVedtaksinstans />
      <MottattKlageinstans />
      <FraVedtaksenhet />
      <UtfallResultat />
      <Lovhjemmel />
      <Tilbakekreving />
    </VStack>
  );
};
