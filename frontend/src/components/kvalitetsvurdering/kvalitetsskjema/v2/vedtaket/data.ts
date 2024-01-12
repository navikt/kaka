import { MAIN_REASON_LABELS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';

export const HEADER = MAIN_REASON_LABELS[MainReason.Vedtaket];

export enum VedtaketBoolean {
  vedtaketAutomatiskVedtak = 'vedtaketAutomatiskVedtak',
  vedtaketDetErLagtTilGrunnFeilFaktum = 'vedtaketDetErLagtTilGrunnFeilFaktum',
  vedtaketIkkeKonkretIndividuellBegrunnelse = 'vedtaketIkkeKonkretIndividuellBegrunnelse',
  vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum = 'vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum',
  vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum = 'vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum',
  vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst = 'vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst',
  vedtaketSpraakOgFormidlingErIkkeTydelig = 'vedtaketSpraakOgFormidlingErIkkeTydelig',
}

export enum VedtaketHjemlerListBoolean {
  vedtaketBruktFeilHjemmel = 'vedtaketBruktFeilHjemmel',
  vedtaketAlleRelevanteHjemlerErIkkeVurdert = 'vedtaketAlleRelevanteHjemlerErIkkeVurdert',
  vedtaketLovbestemmelsenTolketFeil = 'vedtaketLovbestemmelsenTolketFeil',
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet = 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet',
  vedtaketFeilKonkretRettsanvendelse = 'vedtaketFeilKonkretRettsanvendelse',
}

export enum LegacyVedtaketBoolean {
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert = 'vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert',
}

export enum VedtaketAllregistreringshjemlerList {
  vedtaketBruktFeilHjemmelHjemlerList = 'vedtaketBruktFeilHjemmelHjemlerList',
}

export enum VedtaketSaksdatahjemlerList {
  vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList = 'vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList',
  vedtaketLovbestemmelsenTolketFeilHjemlerList = 'vedtaketLovbestemmelsenTolketFeilHjemlerList',
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList = 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList',
  vedtaketFeilKonkretRettsanvendelseHjemlerList = 'vedtaketFeilKonkretRettsanvendelseHjemlerList',
}

export enum LegacyVedtaketHjemlerList {
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList = 'vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList',
}

type Fields =
  | VedtaketBoolean
  | VedtaketHjemlerListBoolean
  | VedtaketSaksdatahjemlerList
  | VedtaketAllregistreringshjemlerList;
type LegacyFields = LegacyVedtaketBoolean | LegacyVedtaketHjemlerList;

const FIELDS = Object.values({
  ...VedtaketBoolean,
  ...VedtaketHjemlerListBoolean,
  ...VedtaketSaksdatahjemlerList,
  ...VedtaketAllregistreringshjemlerList,
});

export const isVedtaketField = (field: string): field is Fields => FIELDS.some((f) => f === field);

export enum VedtaketErrorFields {
  vedtaketGroup = 'vedtaketGroup',
  vedtaketIkkeKonkretIndividuellBegrunnelseGroup = 'vedtaketIkkeKonkretIndividuellBegrunnelseGroup',
}
const ERROR_FIELDS = Object.values(VedtaketErrorFields);

export const isVedtaketErrorField = (field: string): field is VedtaketErrorFields =>
  ERROR_FIELDS.some((f) => f === field);

export const VEDTAKET_LABELS: Record<Fields, string> = {
  [VedtaketBoolean.vedtaketAutomatiskVedtak]: 'Automatisk vedtak',
  [VedtaketHjemlerListBoolean.vedtaketBruktFeilHjemmel]: 'Det er brukt feil hjemmel',
  [VedtaketHjemlerListBoolean.vedtaketAlleRelevanteHjemlerErIkkeVurdert]: 'Alle relevante hjemler er ikke vurdert',
  [VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil]: 'Lovbestemmelsen er tolket feil',
  [VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet]:
    'Innholdet i rettsreglene er ikke tilstrekkelig beskrevet',
  [VedtaketBoolean.vedtaketDetErLagtTilGrunnFeilFaktum]: 'Det er lagt til grunn feil faktum',
  [VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse]: 'Feil i den konkrete rettsanvendelsen',
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelse]: 'Begrunnelsen er ikke konkret og individuell nok',
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum]:
    'Det går ikke godt nok frem hva slags faktum som er lagt til grunn',
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum]:
    'Det går ikke godt nok frem hvordan rettsregelen er anvendt på faktum',
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst]: 'Det er mye standardtekst',
  [VedtaketBoolean.vedtaketSpraakOgFormidlingErIkkeTydelig]: 'Språket og formidlingen er ikke tydelig',

  [VedtaketAllregistreringshjemlerList.vedtaketBruktFeilHjemmelHjemlerList]: 'Hjemler for «Det er brukt feil hjemmel»',
  [VedtaketSaksdatahjemlerList.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList]:
    'Hjemler for «Alle relevante hjemler er ikke vurdert»',
  [VedtaketSaksdatahjemlerList.vedtaketLovbestemmelsenTolketFeilHjemlerList]:
    'Hjemler for «Lovbestemmelsen er tolket feil»',
  [VedtaketSaksdatahjemlerList.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList]:
    'Hjemler for «Innholdet i rettsreglene er ikke tilstrekkelig beskrevet»',
  [VedtaketSaksdatahjemlerList.vedtaketFeilKonkretRettsanvendelseHjemlerList]:
    'Hjemler for «Feil i den konkrete rettsanvendelsen»',
};

export const LEGACY_VEDTAKET_LABELS: Record<LegacyFields, string> = {
  [LegacyVedtaketBoolean.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert]:
    'Det er brukt feil hjemmel eller alle relevante hjemler er ikke vurdert',
  [LegacyVedtaketHjemlerList.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList]:
    'Hjemler for «Det er brukt feil hjemmel eller alle relevante hjemler er ikke vurdert»',
};

export const VEDTAKET_ERROR_LABELS: Record<VedtaketErrorFields, string> = {
  [VedtaketErrorFields.vedtaketGroup]: HEADER,
  [VedtaketErrorFields.vedtaketIkkeKonkretIndividuellBegrunnelseGroup]:
    VEDTAKET_LABELS[VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelse],
};

export const VEDTAKET_HELP_TEXTS: Partial<Record<VedtaketBoolean | VedtaketHjemlerListBoolean, string>> = {
  [VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil]:
    'F.eks. er «en vesentlig medvirkende årsak» tolket som et krav om hovedårsak.',
  [VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet]:
    'F.eks. er ikke alle relevante momenter eller unntak beskrevet som er nødvendige for at bruker skal forstå innholdet i regelen.',
  [VedtaketBoolean.vedtaketDetErLagtTilGrunnFeilFaktum]:
    'Med faktum mener vi de faktiske forhold du legger til grunn etter å ha vurdert og vektet bevisene i saken. Du registrerer her dersom alle relevante bevis ikke er sett/vurdert, herunder informasjon fra andre fagsystemer NAV har tilgang til. Du registrerer også her dersom bevis er tolket eller vektlagt feil.',
  [VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse]:
    'Det er lagt til grunn riktig tolkning av rettsregelen og riktig faktum, men likevel kommet til feil resultat/subsumsjonen er feil.',
  [VedtaketBoolean.vedtaketSpraakOgFormidlingErIkkeTydelig]:
    'F.eks. er ikke språket tilpasset mottaker, oppbyggingen av innholdet er ulogisk, det er mye gjentagelser eller det er ikke mellomrom mellom ordene i brevet.',
};

export const LEGACY_VEDTAKET_HELP_TEXTS = {
  [LegacyVedtaketBoolean.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert]:
    'Du registrerer også her dersom EØS-/utenlandsproblematikk ikke er fanget opp.',
};
