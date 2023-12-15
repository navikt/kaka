import React from 'react';
import { KvalitetsskjemaTextarea } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/textarea';
import { TypeEnum } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/types';
import { AnnetFields } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { useKlageenheter } from '@app/simple-api-state/use-kodeverk';
import { useUser } from '@app/simple-api-state/use-user';

export const Annet = () => {
  const isInKlageenhet = useIsInKlageenhet();

  if (!isInKlageenhet) {
    return null;
  }

  return (
    <KvalitetsskjemaTextarea
      field={AnnetFields.annetFritekst}
      label="Annet (valgfri)"
      helpText="Det du skriver her er kun for klageinstansens interne bruk og blir ikke synlig for vedtaksinstansen. Har saken andre avvik som ikke passer med noen av de andre registreringsmulighetene i Kaka, kan du skrive dette her. Husk å skrive kort / med stikkord. Ikke skriv personopplysninger eller detaljer om saken. Du kan også skrive stikkord dersom saken gjelder et typetilfelle."
      description="Det du skriver her er kun synlig for klageinstansen og ikke for vedtaksinstansen. Husk å ikke skrive personopplysninger."
      type={TypeEnum.TEXTAREA}
    />
  );
};

const useIsInKlageenhet = () => {
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data: klageenheter, isLoading: klageenheterIsLoading } = useKlageenheter();

  if (userIsLoading || klageenheterIsLoading || typeof user === 'undefined' || typeof klageenheter === 'undefined') {
    return false;
  }

  return klageenheter.some(({ id }) => id === user.ansattEnhet.id);
};
