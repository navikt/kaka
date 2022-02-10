import { IKvalitetsvurderingBooleans } from '../../../types/kvalitetsvurdering';

export interface ReasonLabel {
  id: keyof IKvalitetsvurderingBooleans;
  label: string;
}

export const klageforberedelsenReasons: ReasonLabel[] = [
  {
    id: 'sakensDokumenter',
    label: 'Sakens dokumenter',
  },
  {
    id: 'oversittetKlagefristIkkeKommentert',
    label: 'Oversittet klagefrist er ikke kommentert',
  },
  {
    id: 'klagerensRelevanteAnfoerslerIkkeKommentert',
    label: 'Klagerens relevante anførseler er ikke tilstrekkelig kommentert/imøtegått',
  },
  {
    id: 'begrunnelseForHvorforAvslagOpprettholdes',
    label: 'Begrunnelse for hvorfor avslag opprettholdes / klager ikke oppfyller vilkår',
  },
  {
    id: 'konklusjonen',
    label: 'Konklusjonen',
  },
  {
    id: 'oversendelsesbrevetsInnholdIkkeISamsvarMedTema',
    label: 'Oversendelsesbrevets innhold er ikke i samsvar med sakens tema',
  },
];

export const brukAvRaadgivendeLegeReasons: ReasonLabel[] = [
  {
    id: 'raadgivendeLegeErIkkeBrukt',
    label: 'Rådgivende lege er ikke brukt',
  },
  {
    id: 'raadgivendeLegeErBruktFeilSpoersmaal',
    label: 'Rådgivende lege er brukt, men saksbehandler har stilt feil spørsmål og får derfor feil svar',
  },
  {
    id: 'raadgivendeLegeHarUttaltSegUtoverTrygdemedisin',
    label: 'Rådgivende lege har uttalt seg om tema utover trygdemedisin',
  },
  {
    id: 'raadgivendeLegeErBruktMangelfullDokumentasjon',
    label: 'Rådgivende lege er brukt, men dokumentasjonen er mangelfull / ikke skriftliggjort',
  },
];

export const vedtaketReasons: ReasonLabel[] = [
  {
    id: 'detErIkkeBruktRiktigHjemmel',
    label: 'Det er ikke brukt riktig hjemmel(er)',
  },
  {
    id: 'innholdetIRettsregleneErIkkeTilstrekkeligBeskrevet',
    label: 'Innholdet i rettsreglene er ikke tilstrekkelig beskrevet',
  },
  {
    id: 'rettsregelenErBenyttetFeil',
    label: 'Rettsregelen er benyttet eller tolket feil',
  },
  {
    id: 'vurderingAvFaktumErMangelfull',
    label: 'Vurdering av faktum / bevisvurdering er mangelfull',
  },
  {
    id: 'detErFeilIKonkretRettsanvendelse',
    label: 'Det er feil i den konkrete rettsanvendelsen',
  },
  {
    id: 'begrunnelsenErIkkeKonkretOgIndividuell',
    label: 'Begrunnelsen er ikke konkret og individuell',
  },
  {
    id: 'spraaketErIkkeTydelig',
    label: 'Språket/Formidlingen er ikke tydelig',
  },
];

export const annetBaseReasons: ReasonLabel[] = [
  {
    id: 'nyeOpplysningerMottatt',
    label: 'Nye opplysninger mottatt etter oversendelse til klageinstansen',
  },
  {
    id: 'betydeligAvvik',
    label: 'Betydelig avvik med stor økonomisk konsekvens for søker',
  },
];

export const annetKlageReasons: ReasonLabel[] = [
  {
    id: 'brukIOpplaering',
    label: 'Bruk gjerne vedtaket som eksempel i opplæring',
  },
];
