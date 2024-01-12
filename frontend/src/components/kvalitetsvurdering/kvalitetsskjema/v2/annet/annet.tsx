import React from 'react';
import { DESCRIPTION, HELP_TEXT, LABEL } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/annet/data';
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
      label={`${LABEL} (valgfritt)`}
      helpText={HELP_TEXT}
      description={DESCRIPTION}
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
