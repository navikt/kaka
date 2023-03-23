import { IKvalitetsvurderingBooleans, IKvalitetsvurderingTexts } from '@app/types/kvalitetsvurdering/v1';

export interface ReasonLabel {
  id: keyof IKvalitetsvurderingBooleans;
  label: string;
  helpText?: string;
  textareaId?: keyof IKvalitetsvurderingTexts;
}

export const klageforberedelsenReasons: ReasonLabel[] = [
  {
    id: 'sakensDokumenter',
    label: 'Sakens dokumenter',
    helpText:
      'Dokumentene er ikke komplette; f.eks. mangler fysisk saksmappe, feil eller mangelfull journalføring av relevante opplysninger i klagebehandlingen.',
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
    helpText: 'Mangler konklusjon eller konklusjonen er feil.',
  },
  {
    id: 'oversendelsesbrevetsInnholdIkkeISamsvarMedTema',
    label: 'Oversendelsesbrevets innhold er ikke i samsvar med sakens tema',
    helpText:
      'Misforstått tema for saken og dermed treffer ikke behandlingen problemstillingen, tar opp nye forhold som ikke er behandlet i det opprinnelige vedtaket.',
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
    label: 'Det er ikke brukt riktig hjemmel/hjemler',
    helpText: 'Gjelder også når det mangler hjemler.',
  },
  {
    id: 'rettsregelenErBenyttetFeil',
    label: 'Lovbestemmelsen er tolket feil',
  },
  {
    id: 'innholdetIRettsregleneErIkkeTilstrekkeligBeskrevet',
    label: 'Innholdet i rettsreglene er ikke tilstrekkelig beskrevet',
    helpText: 'Det er ikke forståelig for bruker hvordan NAV tolker lovbestemmelsen/innholdet i rettsregelen.',
  },
  {
    id: 'vurderingAvFaktumErMangelfull',
    label: 'Relevant faktum mangler eller er vurdert feil',
    helpText: 'Har ikke sett relevante opplysninger. Har vektet eller tolket faktum feil.',
  },
  {
    id: 'detErFeilIKonkretRettsanvendelse',
    label: 'Det er feil i den konkrete rettsanvendelsen',
    helpText: 'Rettsregelen og faktum er riktig, men likevel kommet til feil resultat - subsumsjonen er feil.',
  },
  {
    id: 'begrunnelsenErIkkeKonkretOgIndividuell',
    label: 'Begrunnelsen er ikke konkret og individuell',
    helpText: 'Mye standardtekst som ikke er tilpasset saken.',
  },
  {
    id: 'spraaketErIkkeTydelig',
    label: 'Språket/formidlingen er ikke tydelig',
    helpText: 'Språk som ikke er tilpasset mottaker, ulogisk oppbygging av innhold.',
  },
];

export const utredningenReasons: ReasonLabel[] = [
  {
    id: 'utredningenAvMedisinskeForhold',
    label: 'Utredningen av medisinske forhold',
    textareaId: 'utredningenAvMedisinskeForholdText',
  },
  {
    id: 'utredningenAvInntektsforhold',
    label: 'Utredningen av inntektsforhold',
    textareaId: 'utredningenAvInntektsforholdText',
  },
  {
    id: 'utredningenAvArbeid',
    label: 'Utredningen av arbeid',
    textareaId: 'utredningenAvArbeidText',
  },
  {
    id: 'arbeidsrettetBrukeroppfoelging',
    label: 'Arbeidsrettet brukeroppfølging',
    textareaId: 'arbeidsrettetBrukeroppfoelgingText',
  },
  {
    id: 'utredningenAvAndreAktuelleForholdISaken',
    label: 'Utredningen av andre aktuelle forhold i saken',
    textareaId: 'utredningenAvAndreAktuelleForholdISakenText',
  },
  {
    id: 'utredningenAvEoesProblematikk',
    label: 'Utredningen av EØS / utenlandsproblematikk',
    textareaId: 'utredningenAvEoesProblematikkText',
  },
  {
    id: 'veiledningFraNav',
    label: 'Veiledning fra NAV',
    textareaId: 'veiledningFraNavText',
    helpText:
      'Mangelfull veiledning i saken slik at bruker ikke får fremmet krav, krever feil ytelse eller ikke forstår hvilke opplysninger hen skal levere for at NAV skal kunne behandle saken.',
  },
];

const ALL_REASONS = [
  ...klageforberedelsenReasons,
  ...brukAvRaadgivendeLegeReasons,
  ...vedtaketReasons,
  ...utredningenReasons,
];

export const getReasonLabel = (key: string): string => ALL_REASONS.find((reason) => reason.id === key)?.label ?? key;
