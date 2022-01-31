export const KLAGEFORBEREDELSEN_REASON_NAMES = {
  sakensDokumenter: 'Sakens dokumenter',
  oversittetKlagefristIkkeKommentert: 'Oversittet klagefrist er ikke kommentert',
  klagerensRelevanteAnfoerslerIkkeKommentert:
    'Klagerens relevante anførseler er ikke tilstrekkelig kommentert/imøtegått',
  begrunnelseForHvorforAvslagOpprettholdes:
    'Begrunnelse for hvorfor avslag opprettholdes / klager ikke oppfyller vilkår',
  konklusjonen: 'Konklusjonen',
  oversendelsesbrevetsInnholdIkkeISamsvarMedTema: 'Oversendelsesbrevets innhold er ikke i samsvar med sakens tema',
};

export const UTREDNINGEN_REASON_NAMES = {
  arbeidsrettetBrukeroppfoelging: 'Arbeidsrettet brukeroppfølging',
  utredningenAvAndreAktuelleForholdISaken: 'Utredningen av andre aktuelle forhold i saken',
  utredningenAvArbeid: 'Utredningen av arbeid',
  utredningenAvEoesProblematikk: 'Utredningen av EØS / utenlandsproblematikk',
  utredningenAvInntektsforhold: 'Utredningen av inntektsforhold',
  utredningenAvMedisinskeForhold: 'Utredningen av medisinske forhold',
  veiledningFraNav: 'Veiledning fra NAV',
};

export const RAADGIVENDE_LEGE_REASON_NAMES = {
  raadgivendeLegeErBruktFeilSpoersmaal:
    'Rådgivende lege er brukt, men saksbehandler har stilt feil spørsmål og får derfor feil svar',
  raadgivendeLegeErBruktMangelfullDokumentasjon:
    'Rådgivende lege er brukt, men dokumentasjonen er mangelfull / ikke skriftliggjort',
  raadgivendeLegeErIkkeBrukt: 'Rådgivende lege er ikke brukt',
  raadgivendeLegeHarUttaltSegUtoverTrygdemedisin: 'Rådgivende lege har uttalt seg om tema utover trygdemedisin',
};

export const VEDTAKET_REASON_NAMES = {
  detErFeilIKonkretRettsanvendelse: 'Det er feil i den konkrete rettsanvendelsen',
  detErIkkeBruktRiktigHjemmel: 'Det er ikke brukt riktig hjemmel(er)',
  innholdetIRettsregleneErIkkeTilstrekkeligBeskrevet: 'Innholdet i rettsreglene er ikke tilstrekkelig beskrevet',
  rettsregelenErBenyttetFeil: 'Rettsregelen er benyttet eller tolket feil',
  vurderingAvFaktumErMangelfull: 'Vurdering av faktum / bevisvurdering er mangelfull',
  spraaketErIkkeTydelig: 'Språket/Formidlingen er ikke tydelig',
  begrunnelsenErIkkeKonkretOgIndividuell: 'Begrunnelsen er ikke konkret og individuell',
};

export const REASON_NAMES = {
  ...KLAGEFORBEREDELSEN_REASON_NAMES,
  ...UTREDNINGEN_REASON_NAMES,
  ...RAADGIVENDE_LEGE_REASON_NAMES,
  ...VEDTAKET_REASON_NAMES,
  betydeligAvvik: 'Betydelig avvik med stor økonomisk konsekvens for søker',
  brukIOpplaering: 'Bruk gjerne vedtaket som eksempel i opplæring',
  nyeOpplysningerMottatt: 'Nye opplysninger mottatt etter oversendelse til klageinstansen',
};

export const isReasonNameKey = (key: string): key is keyof typeof REASON_NAMES =>
  Object.keys(REASON_NAMES).includes(key);

export const useReasonName = (field: keyof typeof REASON_NAMES): string => REASON_NAMES[field] ?? field;
