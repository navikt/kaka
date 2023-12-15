import { MAIN_REASON_LABELS, MainReason } from '../data';

export const HEADER = MAIN_REASON_LABELS[MainReason.Klageforberedelsen];

export enum KlageforberedelsenFields {
  klageforberedelsenSakensDokumenter = 'klageforberedelsenSakensDokumenter',
  klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert = 'klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert',
  klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn = 'klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn',
  klageforberedelsenSakensDokumenterManglerFysiskSaksmappe = 'klageforberedelsenSakensDokumenterManglerFysiskSaksmappe',
  klageforberedelsenOversittetKlagefristIkkeKommentert = 'klageforberedelsenOversittetKlagefristIkkeKommentert',
  klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt = 'klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt',
  klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar = 'klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar',
  klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema = 'klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema',
  klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker = 'klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker',
  klageforberedelsenUtredningenUnderKlageforberedelsen = 'klageforberedelsenUtredningenUnderKlageforberedelsen',
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger = 'klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger',
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst = 'klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst',
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger = 'klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger',
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst = 'klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst',
}

const FIELDS = Object.values(KlageforberedelsenFields);

export const isKlageforberedelsenField = (field: string): field is KlageforberedelsenFields =>
  FIELDS.some((f) => f === field);

export enum KlageforberedelsenErrorFields {
  klageforberedelsenGroup = 'klageforberedelsenGroup',
  klageforberedelsenSakensDokumenterGroup = 'klageforberedelsenSakensDokumenterGroup',
  klageforberedelsenUtredningenUnderKlageforberedelsenGroup = 'klageforberedelsenUtredningenUnderKlageforberedelsenGroup',
}

const ERROR_FIELDS = Object.values(KlageforberedelsenErrorFields);

export const isKlageForberedelsenErrorFields = (field: string): field is KlageforberedelsenErrorFields =>
  ERROR_FIELDS.some((f) => f === field);

export const KLAGEFORBEREDELSEN_LABELS: Record<KlageforberedelsenFields, string> = {
  [KlageforberedelsenFields.klageforberedelsenSakensDokumenter]: 'Sakens dokumenter',
  [KlageforberedelsenFields.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert]:
    'Relevante opplysninger fra andre fagsystemer er ikke journalført',
  [KlageforberedelsenFields.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn]:
    'Journalførte dokumenter har feil titler/navn',
  [KlageforberedelsenFields.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe]: 'Mangler fysisk saksmappe',
  [KlageforberedelsenFields.klageforberedelsenOversittetKlagefristIkkeKommentert]:
    'Oversittet klagefrist er ikke kommentert eller vurdert feil',
  [KlageforberedelsenFields.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt]:
    'Klagers relevante anførsler er ikke tilstrekkelig kommentert/imøtegått',
  [KlageforberedelsenFields.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar]:
    'Begrunnelsen i oversendelsesbrevet',
  [KlageforberedelsenFields.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema]:
    'Oversendelsesbrevets innhold er ikke i samsvar med sakens tema',
  [KlageforberedelsenFields.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker]:
    'Det er ikke sendt kopi av oversendelsesbrevet til parten, eller det er sendt til feil mottaker',
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsen]:
    'Utredningen under klageforberedelsen',
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger]:
    'Klageinstansen har bedt underinstansen om å innhente nye opplysninger',
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst]:
    'Skriv hvilke opplysninger som måtte hentes inn her (valgfri)',
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger]:
    'Klageinstansen har selv innhentet nye opplysninger',
  [KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst]:
    'Skriv hvilke opplysninger som måtte hentes inn her (valgfri)',
};

export const KLAGEFORBEREDELSEN_ERROR_LABELS: Record<KlageforberedelsenErrorFields, string> = {
  [KlageforberedelsenErrorFields.klageforberedelsenGroup]: HEADER,
  [KlageforberedelsenErrorFields.klageforberedelsenSakensDokumenterGroup]:
    KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenFields.klageforberedelsenSakensDokumenter],
  [KlageforberedelsenErrorFields.klageforberedelsenUtredningenUnderKlageforberedelsenGroup]:
    KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsen],
};
