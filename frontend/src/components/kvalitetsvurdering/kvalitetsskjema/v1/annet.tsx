import { Heading } from '@navikt/ds-react';
import { useKvalitetsvurdering } from '@app/hooks/use-kvalitetsvurdering';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { SakstypeEnum } from '@app/types/sakstype';
import { Reasons } from './reasons';
import { Reason } from './types';

export const Annet = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const { data: saksdata } = useSaksdata();

  if (typeof kvalitetsvurdering === 'undefined' || typeof saksdata === 'undefined') {
    return null;
  }

  const showNyeOpplysningerMottattReason = kvalitetsvurdering.utredningenRadioValg === Radiovalg.BRA;

  const showBetydeligAvvikReason =
    kvalitetsvurdering.vedtaketRadioValg === Radiovalg.MANGELFULLT ||
    kvalitetsvurdering.utredningenRadioValg === Radiovalg.MANGELFULLT;

  const showBrukIOpplaeringReason = kvalitetsvurdering.vedtaketRadioValg === Radiovalg.BRA;

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
      helpText: 'Benyttes når vedtaksinstans bør varsles umiddelbart om resultatet av behandlingen',
    },
  ];

  const klageReasons: Reason[] = [
    {
      id: 'brukIOpplaering',
      label: 'Bruk gjerne vedtaket som eksempel i opplæring',
      checked: kvalitetsvurdering.brukIOpplaering,
      textareaId: 'brukIOpplaeringText',
      show: showBrukIOpplaeringReason,
      helpText: 'Benyttes på spesielt gode vedtak, til opplæring i vedtaksinstans.',
    },
  ];

  const reasons = saksdata.sakstypeId === SakstypeEnum.ANKE ? baseReasons : [...baseReasons, ...klageReasons];

  return (
    <section>
      <Heading size="small">Annet</Heading>
      <Reasons show legendText="" reasons={reasons} />
    </section>
  );
};
