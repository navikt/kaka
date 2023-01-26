import {
  BrukAvRaadgivendeLegeReasons,
  IkkeKonkretBegrunnelseReasons,
  KlageforberedelsenReasons,
  SakensDokumenterReasons,
  UtredningenReasons,
  VedtaketReasons,
} from '../components/statistikk/charts/v2/kvalitetsvurderinger/calculations/constants';
import { IKvalitetsvurderingData, MainReason } from '../types/kvalitetsvurdering/v2';
import { UtfallEnum } from '../types/utfall';

export const NAV_COLORS = Object.freeze({
  transparent: 'rgba(255, 255, 255, 0)',
  white: 'rgb(255, 255, 255)',
  nav: {
    red: 'rgb(195, 0, 0)',
  },
  gray: {
    '50': 'rgb(247, 247, 247)',
    '100': 'rgb(241, 241, 241)',
    '200': 'rgb(229, 229, 229)',
    '300': 'rgb(207, 207, 207)',
    '400': 'rgb(176, 176, 176)',
    '500': 'rgb(143, 143, 143)',
    '600': 'rgb(112, 112, 112)',
    '700': 'rgb(89, 89, 89)',
    '800': 'rgb(64, 64, 64)',
    '900': 'rgb(38, 38, 38)',
  },
  grayalpha: {
    '50': 'rgba(0, 0, 0, 0.03)',
    '100': 'rgba(0, 0, 0, 0.05)',
    '200': 'rgba(0, 0, 0, 0.1)',
    '300': 'rgba(0, 0, 0, 0.19)',
    '400': 'rgba(0, 0, 0, 0.31)',
    '500': 'rgba(0, 0, 0, 0.44)',
    '600': 'rgba(0, 0, 0, 0.56)',
    '700': 'rgba(0, 0, 0, 0.65)',
    '800': 'rgba(0, 0, 0, 0.75)',
    '900': 'rgba(0, 0, 0, 0.85)',
  },
  blue: {
    '50': 'rgb(230, 240, 255)',
    '100': 'rgb(204, 225, 255)',
    '200': 'rgb(153, 195, 255)',
    '300': 'rgb(102, 165, 244)',
    '400': 'rgb(51, 134, 224)',
    '500': 'rgb(0, 103, 197)',
    '600': 'rgb(0, 86, 180)',
    '700': 'rgb(0, 69, 156)',
    '800': 'rgb(0, 52, 125)',
    '900': 'rgb(0, 34, 82)',
  },
  red: {
    '50': 'rgb(255, 230, 230)',
    '100': 'rgb(255, 184, 184)',
    '200': 'rgb(246, 130, 130)',
    '300': 'rgb(242, 92, 92)',
    '400': 'rgb(222, 46, 46)',
    '500': 'rgb(195, 0, 0)',
    '600': 'rgb(173, 0, 0)',
    '700': 'rgb(140, 0, 0)',
    '800': 'rgb(92, 0, 0)',
    '900': 'rgb(38, 0, 0)',
  },
  deepblue: {
    '50': 'rgb(230, 241, 248)',
    '100': 'rgb(204, 226, 240)',
    '200': 'rgb(153, 196, 221)',
    '300': 'rgb(102, 163, 196)',
    '400': 'rgb(51, 128, 165)',
    '500': 'rgb(0, 91, 130)',
    '600': 'rgb(0, 80, 119)',
    '700': 'rgb(0, 67, 103)',
    '800': 'rgb(0, 52, 83)',
    '900': 'rgb(0, 36, 58)',
  },
  green: {
    '50': 'rgb(243, 252, 245)',
    '100': 'rgb(204, 241, 214)',
    '200': 'rgb(153, 222, 173)',
    '300': 'rgb(102, 199, 134)',
    '400': 'rgb(51, 170, 95)',
    '500': 'rgb(6, 137, 58)',
    '600': 'rgb(0, 124, 46)',
    '700': 'rgb(0, 106, 35)',
    '800': 'rgb(0, 85, 25)',
    '900': 'rgb(0, 59, 15)',
  },
  lightblue: {
    '50': 'rgb(235, 252, 255)',
    '100': 'rgb(216, 249, 255)',
    '200': 'rgb(181, 241, 255)',
    '300': 'rgb(151, 230, 255)',
    '400': 'rgb(124, 218, 248)',
    '500': 'rgb(102, 203, 236)',
    '600': 'rgb(76, 173, 205)',
    '700': 'rgb(54, 141, 168)',
    '800': 'rgb(35, 107, 125)',
    '900': 'rgb(19, 72, 82)',
  },
  limegreen: {
    '50': 'rgb(253, 255, 230)',
    '100': 'rgb(249, 252, 204)',
    '200': 'rgb(236, 243, 153)',
    '300': 'rgb(217, 227, 102)',
    '400': 'rgb(193, 203, 51)',
    '500': 'rgb(162, 173, 0)',
    '600': 'rgb(147, 158, 0)',
    '700': 'rgb(127, 137, 0)',
    '800': 'rgb(102, 110, 0)',
    '900': 'rgb(71, 78, 0)',
  },
  orange: {
    '50': 'rgb(255, 249, 240)',
    '100': 'rgb(255, 236, 204)',
    '200': 'rgb(255, 215, 153)',
    '300': 'rgb(255, 193, 102)',
    '400': 'rgb(255, 170, 51)',
    '500': 'rgb(255, 145, 0)',
    '600': 'rgb(212, 123, 0)',
    '700': 'rgb(168, 100, 0)',
    '800': 'rgb(125, 76, 0)',
    '900': 'rgb(82, 51, 0)',
  },
  purple: {
    '50': 'rgb(239, 236, 244)',
    '100': 'rgb(224, 216, 233)',
    '200': 'rgb(192, 178, 210)',
    '300': 'rgb(161, 141, 187)',
    '400': 'rgb(130, 105, 162)',
    '500': 'rgb(99, 70, 137)',
    '600': 'rgb(82, 56, 116)',
    '700': 'rgb(65, 43, 93)',
    '800': 'rgb(48, 31, 70)',
    '900': 'rgb(31, 20, 47)',
  },
});

export const MAINREASON_COLOR_MAP: Record<MainReason, string> = Object.freeze({
  [MainReason.Klageforberedelsen]: NAV_COLORS.blue[400],
  [MainReason.Utredningen]: NAV_COLORS.orange[400],
  [MainReason.Vedtaket]: NAV_COLORS.green[400],
  [MainReason.BrukAvRaadgivendeLege]: NAV_COLORS.red[400],
});

type SubReasonColorMap = Partial<Record<keyof IKvalitetsvurderingData, string>>;

const KLAGEFORBEREDELSEN_COLOR_MAP: SubReasonColorMap = Object.freeze({
  [KlageforberedelsenReasons.klageforberedelsenSakensDokumenter]: NAV_COLORS.blue[300],
  [KlageforberedelsenReasons.klageforberedelsenOversittetKlagefristIkkeKommentert]: NAV_COLORS.blue[400],
  [KlageforberedelsenReasons.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt]:
    NAV_COLORS.blue[500],
  [KlageforberedelsenReasons.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar]:
    NAV_COLORS.blue[600],
  [KlageforberedelsenReasons.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema]:
    NAV_COLORS.blue[700],
  [KlageforberedelsenReasons.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker]:
    NAV_COLORS.blue[800],
});

const UTREDNINGEN_COLOR_MAP: SubReasonColorMap = Object.freeze({
  [UtredningenReasons.utredningenAvMedisinskeForhold]: NAV_COLORS.orange[400],
  [UtredningenReasons.utredningenAvInntektsforhold]: NAV_COLORS.orange[500],
  [UtredningenReasons.utredningenAvArbeidsaktivitet]: NAV_COLORS.orange[600],
  [UtredningenReasons.utredningenAvEoesUtenlandsproblematikk]: NAV_COLORS.orange[700],
  [UtredningenReasons.utredningenAvAndreAktuelleForholdISaken]: NAV_COLORS.orange[800],
});

export const VEDTAKET_COLOR_MAP: SubReasonColorMap = Object.freeze({
  [VedtaketReasons.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert]: NAV_COLORS.green[200],
  [VedtaketReasons.vedtaketLovbestemmelsenTolketFeil]: NAV_COLORS.green[300],
  [VedtaketReasons.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet]: NAV_COLORS.green[400],
  [VedtaketReasons.vedtaketDetErLagtTilGrunnFeilFaktum]: NAV_COLORS.green[500],
  [VedtaketReasons.vedtaketFeilKonkretRettsanvendelse]: NAV_COLORS.green[600],
  [VedtaketReasons.vedtaketIkkeKonkretIndividuellBegrunnelse]: NAV_COLORS.green[700],
  [VedtaketReasons.vedtaketSpraakOgFormidlingErIkkeTydelig]: NAV_COLORS.green[800],
});

const BRUK_AV_RAADGIVENDE_LEGE_COLOR_MAP: SubReasonColorMap = Object.freeze({
  [BrukAvRaadgivendeLegeReasons.raadgivendeLegeIkkebrukt]: NAV_COLORS.red[400],
  [BrukAvRaadgivendeLegeReasons.raadgivendeLegeMangelfullBrukAvRaadgivendeLege]: NAV_COLORS.red[500],
  [BrukAvRaadgivendeLegeReasons.raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin]: NAV_COLORS.red[600],
  [BrukAvRaadgivendeLegeReasons.raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert]: NAV_COLORS.red[700],
});

export const SUBREASON_COLOR_MAP: Record<MainReason, SubReasonColorMap> = Object.freeze({
  [MainReason.Klageforberedelsen]: KLAGEFORBEREDELSEN_COLOR_MAP,
  [MainReason.Utredningen]: UTREDNINGEN_COLOR_MAP,
  [MainReason.Vedtaket]: VEDTAKET_COLOR_MAP,
  [MainReason.BrukAvRaadgivendeLege]: BRUK_AV_RAADGIVENDE_LEGE_COLOR_MAP,
});

export const SAKENS_DOKUMENTER_COLOR_MAP: SubReasonColorMap = Object.freeze({
  [SakensDokumenterReasons.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert]:
    NAV_COLORS.blue[400],
  [SakensDokumenterReasons.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn]: NAV_COLORS.blue[500],
  [SakensDokumenterReasons.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe]: NAV_COLORS.blue[600],
});

export const IKKE_KONKRET_BEGRUNNELSE_COLOR_MAP: SubReasonColorMap = Object.freeze({
  [IkkeKonkretBegrunnelseReasons.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum]: NAV_COLORS.green[400],
  [IkkeKonkretBegrunnelseReasons.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum]:
    NAV_COLORS.green[500],
  [IkkeKonkretBegrunnelseReasons.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst]: NAV_COLORS.green[600],
});

export const UTFALL_COLOR_MAP: Record<UtfallEnum, string> = Object.freeze({
  [UtfallEnum.AVVIST]: '#B0B0B0',
  [UtfallEnum.DELVIS_MEDHOLD]: '#FFAA33',
  [UtfallEnum.MEDHOLD]: '#D05C4A',
  [UtfallEnum.OPPHEVET]: '#C1CB33',
  [UtfallEnum.RETUR]: '#3386E0',
  [UtfallEnum.STADFESTELSE]: '#33AA5F',
  [UtfallEnum.TRUKKET]: '#7CDAF8',
  [UtfallEnum.UGUNST]: '#8269A2',
  [UtfallEnum.INNSTILLING_STADFESTELSE]: '#005519',
  [UtfallEnum.INNSTILLING_AVVIST]: '#262626',
});
