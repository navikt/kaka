export const FIELD_NAMES = {
  klageforberedelsenRadioValg: 'Klageforberedelsen',
  utredningenRadioValg: 'Utredningen',
  vedtaketRadioValg: 'Vedtaket',
  brukAvRaadgivendeLegeRadioValg: 'Bruk av rådgivende lege',
  utfallId: 'Utfall/resultat',
  hjemmel: 'Lovhjemmel',
  sakenGjelder: 'Saken gjelder',
  sakstypeId: 'Sakstype',
  tema: 'Tema',
  ytelseId: 'Ytelse',
  mottattVedtaksinstans: 'Mottatt vedtaksinstans',
  mottattKlageinstans: 'Mottatt klageinstans',
  vedtaksinstansEnhet: 'Fra vedtaksenhet',
};

export const useFieldName = (field: keyof typeof FIELD_NAMES): string => FIELD_NAMES[field] ?? field;
