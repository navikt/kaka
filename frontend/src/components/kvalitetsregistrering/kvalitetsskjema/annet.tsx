import React from 'react';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { RadioValg } from '../../../types/kvalitetsvurdering';
import { Checkboxes } from './checkboxes';
import { Reason } from './reasons';
import { FormSection, SubHeader } from './styled-components';

export const Annet = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();

  if (typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  const showNyeOpplysningerMottattReason = kvalitetsvurdering.utredningenRadioValg === RadioValg.BRA;

  const showBetydeligAvvikReason =
    kvalitetsvurdering.vedtaketRadioValg === RadioValg.MANGELFULLT ||
    kvalitetsvurdering.utredningenRadioValg === RadioValg.MANGELFULLT;

  const showBrukIOpplaeringReason =
    kvalitetsvurdering.vedtaketRadioValg === RadioValg.BRA || kvalitetsvurdering.utredningenRadioValg === RadioValg.BRA;

  const showForm = showNyeOpplysningerMottattReason || showBetydeligAvvikReason || showBrukIOpplaeringReason;

  if (!showForm) {
    return null;
  }

  const reasons: Reason[] = [
    {
      id: 'nyeOpplysningerMottatt',
      label: 'Nye opplysninger mottatt etter oversendelse til klageinstansen',
      checked: kvalitetsvurdering.nyeOpplysningerMottatt,
      show: showNyeOpplysningerMottattReason,
      helpText:
        'Benyttes når vedtaksinstansen ikke kunne gjort noe annerledes for å forhindre et endret resultat i klageinstansen',
    },
    {
      id: 'betydeligAvvik',
      label: 'Betydelig avvik med stor økonomisk konsekvens for søker',
      checked: kvalitetsvurdering.betydeligAvvik,
      textareaId: 'betydeligAvvikText',
      show: showBetydeligAvvikReason,
      helpText: 'Benyttes når det er et alvorlig avvik med en stor økonomisk konsekvens for bruker.',
    },
    {
      id: 'brukIOpplaering',
      label: 'Bruk gjerne dette som eksempel i opplæring',
      checked: kvalitetsvurdering.brukIOpplaering,
      textareaId: 'brukIOpplaeringText',
      show: showBrukIOpplaeringReason,
      helpText: 'Benyttes på spesielt gode vedtak, til opplæring i førsteinstans.',
    },
  ];

  return (
    <FormSection>
      <SubHeader>Annet</SubHeader>
      <Checkboxes reasons={reasons} />
    </FormSection>
  );
};
