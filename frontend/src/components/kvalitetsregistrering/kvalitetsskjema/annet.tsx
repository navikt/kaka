import React from 'react';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { RadioValg } from '../../../types/kvalitetsvurdering';
import { SakstypeEnum } from '../../../types/sakstype';
import { Checkboxes } from './checkboxes';
import { Reason } from './reasons';
import { FormSection, SubHeader } from './styled-components';

export const Annet = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const [saksdata] = useSaksdata();

  if (typeof kvalitetsvurdering === 'undefined' || typeof saksdata === 'undefined') {
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

  const baseReasons: Reason[] = [
    {
      id: 'nyeOpplysningerMottatt',
      label: 'Nye opplysninger mottatt etter oversendelse til klageinstansen',
      checked: kvalitetsvurdering.nyeOpplysningerMottatt,
      show: showNyeOpplysningerMottattReason,
      helpText: 'Benyttes når utredningen til vedtaksinstansen er tilstrekkelig',
    },
    {
      id: 'betydeligAvvik',
      label: 'Betydelig avvik med stor økonomisk konsekvens for søker',
      checked: kvalitetsvurdering.betydeligAvvik,
      textareaId: 'betydeligAvvikText',
      show: showBetydeligAvvikReason,
      helpText: 'Benyttes når førsteinstans bør varsles umiddelbart om resultatet av behandlingen',
    },
  ];

  const klageReasons: Reason[] = [
    {
      id: 'brukIOpplaering',
      label: 'Bruk gjerne dette som eksempel i opplæring',
      checked: kvalitetsvurdering.brukIOpplaering,
      textareaId: 'brukIOpplaeringText',
      show: showBrukIOpplaeringReason,
      helpText: 'Benyttes på spesielt gode vedtak, til opplæring i førsteinstans.',
    },
  ];

  const reasons = saksdata.sakstypeId === SakstypeEnum.ANKE ? baseReasons : [...baseReasons, ...klageReasons];

  return (
    <FormSection>
      <SubHeader>Annet</SubHeader>
      <Checkboxes reasons={reasons} />
    </FormSection>
  );
};
