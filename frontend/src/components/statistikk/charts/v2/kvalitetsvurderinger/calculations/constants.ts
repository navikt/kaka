import { MainReason } from '../../../../../../types/kvalitetsvurdering/v2';
import { KVALITETSVURDERING_V2_FIELD_NAMES } from '../../../../../kvalitetsvurdering/kvalitetsskjema/v2/common/use-field-name';

export const MAIN_REASON_IDS: Readonly<MainReason[]> = Object.freeze([
  MainReason.Klageforberedelsen,
  MainReason.Utredningen,
  MainReason.Vedtaket,
  MainReason.BrukAvRaadgivendeLege,
]);

export enum KlageforberedelsenReasons {
  sakensDokumenter = 'sakensDokumenter',
  klageforberedelsenOversittetKlagefristIkkeKommentert = 'klageforberedelsenOversittetKlagefristIkkeKommentert',
  klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt = 'klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt',
  klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar = 'klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar',
  klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema = 'klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema',
  klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker = 'klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker',
}

export enum UtredningenReasons {
  utredningenAvMedisinskeForhold = 'utredningenAvMedisinskeForhold',
  utredningenAvInntektsforhold = 'utredningenAvInntektsforhold',
  utredningenAvArbeidsaktivitet = 'utredningenAvArbeidsaktivitet',
  utredningenAvEoesUtenlandsproblematikk = 'utredningenAvEoesUtenlandsproblematikk',
  utredningenAvAndreAktuelleForholdISaken = 'utredningenAvAndreAktuelleForholdISaken',
}

export enum VedtaketReasons {
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert = 'vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert',
  vedtaketLovbestemmelsenTolketFeil = 'vedtaketLovbestemmelsenTolketFeil',
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet = 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet',
  vedtaketDetErLagtTilGrunnFeilFaktum = 'vedtaketDetErLagtTilGrunnFeilFaktum',
  vedtaketFeilKonkretRettsanvendelse = 'vedtaketFeilKonkretRettsanvendelse',
  vedtaketIkkeKonkretIndividuellBegrunnelse = 'vedtaketIkkeKonkretIndividuellBegrunnelse',
  vedtaketSpraakOgFormidlingErIkkeTydelig = 'vedtaketSpraakOgFormidlingErIkkeTydelig',
}

export enum BrukAvRaadgivendeLegeReasons {
  raadgivendeLegeIkkebrukt = 'raadgivendeLegeIkkebrukt',
  raadgivendeLegeMangelfullBrukAvRaadgivendeLege = 'raadgivendeLegeMangelfullBrukAvRaadgivendeLege',
  raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin = 'raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin',
  raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert = 'raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert',
}

export enum SakensDokumenterReasons {
  sakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert = 'sakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert',
  sakensDokumenterJournalfoerteDokumenterFeilNavn = 'sakensDokumenterJournalfoerteDokumenterFeilNavn',
  sakensDokumenterManglerFysiskSaksmappe = 'sakensDokumenterManglerFysiskSaksmappe',
}

export enum IkkeKonkretBegrunnelseReasons {
  vedtaketIkkeGodtNokFremFaktum = 'vedtaketIkkeGodtNokFremFaktum',
  vedtaketIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum = 'vedtaketIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum',
  vedtaketMyeStandardtekst = 'vedtaketMyeStandardtekst',
}

const KLAGEFORBEREDELSEN_REASONS = Object.values(KlageforberedelsenReasons);
const UTREDNINGEN_REASONS = Object.values(UtredningenReasons);
const VEDTAKET_REASONS = Object.values(VedtaketReasons);
const BRUK_AV_RAADGIVENDE_LEGE_REASONS = Object.values(BrukAvRaadgivendeLegeReasons);
export const SAKENS_DOKUMENTER_REASONS = Object.values(SakensDokumenterReasons);
export const IKKE_KONKRET_BEGRUNNELSE_REASONS = Object.values(IkkeKonkretBegrunnelseReasons);

export const REASON_TO_SUBREASONS: Record<MainReason, (keyof typeof KVALITETSVURDERING_V2_FIELD_NAMES)[]> = {
  [MainReason.Klageforberedelsen]: KLAGEFORBEREDELSEN_REASONS,
  [MainReason.Utredningen]: UTREDNINGEN_REASONS,
  [MainReason.Vedtaket]: VEDTAKET_REASONS,
  [MainReason.BrukAvRaadgivendeLege]: BRUK_AV_RAADGIVENDE_LEGE_REASONS,
};
