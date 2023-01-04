import { Alert } from '@navikt/ds-react';
import React from 'react';

export const VersionWarning = () => (
  <Alert variant="warning" size="medium" fullWidth>
    Kaka har fått en versjon som gjelder fra 1. januar 2023. Når du skal se på statistikk, må du velge mellom de to nye
    knappene som du finner under filter. Du kan se statistikk for 2022 og fra 2023, men kan ikke se på tvers. Vi jobber
    fortløpende med hvordan vi skal vise kvalitetsvurderinger. Disse vil bli synlige i løpet av februar 2023.
  </Alert>
);
