import { BrukAvRaadgivendeOverlegeBoolean } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/bruk-av-raadgivende-overlege/data';
import { AnnetFields, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  KlageforberedelsenBoolean,
  KlageforberedelsenTextInput,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';
import { UtredningenBoolean } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/data';
import {
  VedtaketAllregistreringshjemlerList,
  VedtaketBoolean,
  VedtaketHjemlerListBoolean,
  VedtaketSaksdatahjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { Radiovalg, RadiovalgExtended } from './radio';

interface SakensDokumenter {
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe]: boolean;
}

interface UtredningenUnderKlageforberedelsen
  extends KlageforberedelsenUtredningenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger,
    KlageforberedelsenUtredningenKlageinstansenHarSelvInnhentetNyeOpplysninger {
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger]: boolean;
}

interface KlageforberedelsenUtredningenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger {
  [KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst]:
    | string
    | null;
}

interface KlageforberedelsenUtredningenKlageinstansenHarSelvInnhentetNyeOpplysninger {
  [KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst]:
    | string
    | null;
}

interface IKlageforberedelsen extends SakensDokumenter, UtredningenUnderKlageforberedelsen {
  [MainReason.Klageforberedelsen]: Radiovalg | null;
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenOversittetKlagefristIkkeKommentert]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker]: boolean;
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen]: boolean;
}

interface IUtredningen {
  [MainReason.Utredningen]: Radiovalg | null;
  [UtredningenBoolean.utredningenAvMedisinskeForhold]: boolean;
  [UtredningenBoolean.utredningenAvInntektsforhold]: boolean;
  [UtredningenBoolean.utredningenAvArbeidsaktivitet]: boolean;
  [UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk]: boolean;
  [UtredningenBoolean.utredningenAvSivilstandBoforhold]: boolean;
  [UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken]: boolean;
}

interface BruktFeilHjemmel {
  [VedtaketHjemlerListBoolean.vedtaketBruktFeilHjemmel]: boolean;
  [VedtaketAllregistreringshjemlerList.vedtaketBruktFeilHjemmelHjemlerList]: string[];
}

interface AlleRelevanteHjemlerErIkkeVurdert {
  [VedtaketHjemlerListBoolean.vedtaketAlleRelevanteHjemlerErIkkeVurdert]: boolean;
  [VedtaketSaksdatahjemlerList.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList]: string[];
}

interface LovbestemmelsenTolketFeil {
  [VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil]: boolean;
  [VedtaketSaksdatahjemlerList.vedtaketLovbestemmelsenTolketFeilHjemlerList]: string[];
}

interface InnholdetIRettsreglene {
  [VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet]: boolean;
  [VedtaketSaksdatahjemlerList.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList]: string[];
}

interface FeilKonkretRettsanvendelse {
  [VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse]: boolean;
  [VedtaketSaksdatahjemlerList.vedtaketFeilKonkretRettsanvendelseHjemlerList]: string[];
}

interface KonkretIndividuellBegrunnelse {
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelse]: boolean;
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum]: boolean;
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum]: boolean;
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst]: boolean;
}

interface IVedtaket
  extends BruktFeilHjemmel,
    AlleRelevanteHjemlerErIkkeVurdert,
    LovbestemmelsenTolketFeil,
    InnholdetIRettsreglene,
    FeilKonkretRettsanvendelse,
    KonkretIndividuellBegrunnelse {
  [VedtaketBoolean.vedtaketAutomatiskVedtak]: boolean;
  [MainReason.Vedtaket]: Radiovalg | null;
  [VedtaketBoolean.vedtaketDetErLagtTilGrunnFeilFaktum]: boolean;
  [VedtaketBoolean.vedtaketSpraakOgFormidlingErIkkeTydelig]: boolean;
}

interface BrukAvRaadgivendeLegeMangelfullt {
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeIkkebrukt]: boolean;
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]: boolean;
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin]: boolean;
  [BrukAvRaadgivendeOverlegeBoolean.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert]: boolean;
}

interface BrukAvRaadgivendeLege extends BrukAvRaadgivendeLegeMangelfullt {
  [MainReason.BrukAvRaadgivendeLege]: RadiovalgExtended | null;
}

interface Annet {
  [AnnetFields.annetFritekst]: string | null;
}

export type IKvalitetsvurderingSaksdataHjemler = Pick<
  IVedtaket,
  | VedtaketSaksdatahjemlerList.vedtaketLovbestemmelsenTolketFeilHjemlerList
  | VedtaketSaksdatahjemlerList.vedtaketFeilKonkretRettsanvendelseHjemlerList
  | VedtaketSaksdatahjemlerList.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList
  | VedtaketSaksdatahjemlerList.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList
>;

export type IKvalitetsvurderingAllRegistreringshjemler = Pick<
  IVedtaket,
  VedtaketAllregistreringshjemlerList.vedtaketBruktFeilHjemmelHjemlerList
>;

export type IKvalitetsvurderingStrings = Annet &
  Pick<
    IKlageforberedelsen,
    | KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst
    | KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst
  >;

export type IKvalitetsvurderingData = IKlageforberedelsen & IUtredningen & IVedtaket & BrukAvRaadgivendeLege & Annet;

export type IKvalitetsvurderingBooleans = Omit<
  IKvalitetsvurderingData,
  | MainReason.Klageforberedelsen
  | MainReason.Utredningen
  | MainReason.BrukAvRaadgivendeLege
  | MainReason.Vedtaket
  | keyof IKvalitetsvurderingAllRegistreringshjemler
  | keyof IKvalitetsvurderingSaksdataHjemler
  | keyof IKvalitetsvurderingStrings
>;
