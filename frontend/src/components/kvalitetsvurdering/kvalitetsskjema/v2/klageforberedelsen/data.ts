import { MAIN_REASON_LABELS, MainReason } from '../data';

export const HEADER = MAIN_REASON_LABELS[MainReason.Klageforberedelsen];

export enum KlageforberedelsenBoolean {
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
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger = 'klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger',
  klageforberedelsenSakensDokumenter = 'klageforberedelsenSakensDokumenter',
}

export enum KlageforberedelsenTextInput {
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst = 'klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst',
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst = 'klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst',
}

type KlageforberedelsenFields = KlageforberedelsenBoolean | KlageforberedelsenTextInput;

const FIELDS = Object.values({
  ...KlageforberedelsenBoolean,
  ...KlageforberedelsenTextInput,
});

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
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter]: 'Sakens dokumenter',
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert]:
    'Relevante opplysninger fra andre fagsystemer er ikke journalført',
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn]:
    'Journalførte dokumenter har feil titler/navn',
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe]: 'Mangler fysisk saksmappe',
  [KlageforberedelsenBoolean.klageforberedelsenOversittetKlagefristIkkeKommentert]:
    'Oversittet klagefrist er ikke kommentert eller vurdert feil',
  [KlageforberedelsenBoolean.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt]:
    'Klagers relevante anførsler er ikke tilstrekkelig kommentert/imøtegått',
  [KlageforberedelsenBoolean.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar]:
    'Begrunnelsen i oversendelsesbrevet',
  [KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema]:
    'Oversendelsesbrevets innhold er ikke i samsvar med sakens tema',
  [KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker]:
    'Det er ikke sendt kopi av oversendelsesbrevet til parten, eller det er sendt til feil mottaker',
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen]:
    'Utredningen under klageforberedelsen',
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger]:
    'Klageinstansen har bedt underinstansen om å innhente nye opplysninger (valgfri)',
  [KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst]:
    'Skriv hvilke opplysninger som måtte hentes inn her (valgfri)',
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger]:
    'Klageinstansen har selv innhentet nye opplysninger (valgfri)',
  [KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst]:
    'Skriv hvilke opplysninger som måtte hentes inn her (valgfri)',
};

export const KLAGEFORBEREDELSEN_HELP_TEXTS = {
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter]:
    'Dokumentene er ikke fullstendige; f.eks. feil eller mangelfull journalføring av relevante opplysninger i klagebehandlingen.',
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert]:
    'F.eks. notater, klager, referat eller andre opplysninger fra Arena,  Pesys, Infotrygd, A-inntekt, Modia, eller digital aktivitetsplan.',
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn]:
    'F.eks. står det «fritekstbrev» i stedet for «vedtak», eller «samtale» i stedet for «klage».',
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe]:
    'Gjelder kun i saker det er relevant/nødvendig.',
  [KlageforberedelsenBoolean.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar]:
    'F.eks. er vilkår eller tema i oversendelsesbrevet vurdert feil, det er henvist til feil hjemler eller begrunnelsen er vanskelig å forstå.',
  [KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker]:
    'F.eks. er oversendelsesbrevet ikke sendt til fullmektig i saken.',
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen]:
    'Gjelder kvaliteten på utredningen under klageforberedelsen (fra vedtak ble fattet til saken ble oversendt klageinstansen). Gjelder kvaliteten på utredningen av opplysninger som NAV ikke har tilgang til. Dersom utredningen var mangelfull før vedtak ble fattet og dette ikke ble rettet opp under klageforberedelsen, huker du av for mangelfull utredning både her og under Utredningen før vedtak.',
  [KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst]:
    'Det du skriver her er kun for klageinstansens interne bruk og blir ikke synlig for vedtaksinstansen. Husk å skrive kort / med stikkord. Ikke skriv personopplysninger eller detaljer om saken.',
  [KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst]:
    'Det du skriver her er kun for klageinstansens interne bruk og blir ikke synlig for vedtaksinstansen. Husk å skrive kort / med stikkord. Ikke skriv personopplysninger eller detaljer om saken.',
};

export const KLAGEFORBEREDELSEN_DESCRIPTIONS: Partial<Record<KlageforberedelsenTextInput, string>> = {
  [KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst]:
    'Det du skriver her er kun synlig for klageinstansen og ikke for vedtaksinstansen. Husk å ikke skrive personopplysninger.',
  [KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst]:
    'Det du skriver her er kun synlig for klageinstansen og ikke for vedtaksinstansen. Husk å ikke skrive personopplysninger.',
};

export const KLAGEFORBEREDELSEN_ERROR_LABELS: Record<KlageforberedelsenErrorFields, string> = {
  [KlageforberedelsenErrorFields.klageforberedelsenGroup]: HEADER,
  [KlageforberedelsenErrorFields.klageforberedelsenSakensDokumenterGroup]:
    KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter],
  [KlageforberedelsenErrorFields.klageforberedelsenUtredningenUnderKlageforberedelsenGroup]:
    KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen],
};
