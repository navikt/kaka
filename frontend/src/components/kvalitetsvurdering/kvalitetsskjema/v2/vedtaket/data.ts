import { MAIN_REASON_LABELS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';

export const HEADER = MAIN_REASON_LABELS[MainReason.Vedtaket];

export enum VedtaketFields {
  vedtaketAutomatiskVedtak = 'vedtaketAutomatiskVedtak',
  vedtaketBruktFeilHjemmel = 'vedtaketBruktFeilHjemmel',
  vedtaketAlleRelevanteHjemlerErIkkeVurdert = 'vedtaketAlleRelevanteHjemlerErIkkeVurdert',
  vedtaketLovbestemmelsenTolketFeil = 'vedtaketLovbestemmelsenTolketFeil',
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet = 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet',
  vedtaketDetErLagtTilGrunnFeilFaktum = 'vedtaketDetErLagtTilGrunnFeilFaktum',
  vedtaketFeilKonkretRettsanvendelse = 'vedtaketFeilKonkretRettsanvendelse',
  vedtaketIkkeKonkretIndividuellBegrunnelse = 'vedtaketIkkeKonkretIndividuellBegrunnelse',
  vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum = 'vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum',
  vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum = 'vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum',
  vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst = 'vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst',
  vedtaketSpraakOgFormidlingErIkkeTydelig = 'vedtaketSpraakOgFormidlingErIkkeTydelig',

  vedtaketBruktFeilHjemmelHjemlerList = 'vedtaketBruktFeilHjemmelHjemlerList',
  vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList = 'vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList',
  vedtaketLovbestemmelsenTolketFeilHjemlerList = 'vedtaketLovbestemmelsenTolketFeilHjemlerList',
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList = 'vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList',
  vedtaketFeilKonkretRettsanvendelseHjemlerList = 'vedtaketFeilKonkretRettsanvendelseHjemlerList',
}

const FIELDS = Object.values(VedtaketFields);

export const isVedtaketField = (field: string): field is VedtaketFields => FIELDS.some((f) => f === field);

export enum VedtaketErrorFields {
  vedtaketGroup = 'vedtaketGroup',
  vedtaketIkkeKonkretIndividuellBegrunnelseGroup = 'vedtaketIkkeKonkretIndividuellBegrunnelseGroup',
}
const ERROR_FIELDS = Object.values(VedtaketErrorFields);

export const isVedtaketErrorField = (field: string): field is VedtaketErrorFields =>
  ERROR_FIELDS.some((f) => f === field);

export const VEDTAKET_LABELS: Record<VedtaketFields, string> = {
  [VedtaketFields.vedtaketAutomatiskVedtak]: 'Automatisk vedtak',
  [VedtaketFields.vedtaketBruktFeilHjemmel]: 'Det er brukt feil hjemmel',
  [VedtaketFields.vedtaketAlleRelevanteHjemlerErIkkeVurdert]: 'Alle relevante hjemler er ikke vurdert',
  [VedtaketFields.vedtaketLovbestemmelsenTolketFeil]: 'Lovbestemmelsen er tolket feil',
  [VedtaketFields.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet]:
    'Innholdet i rettsreglene er ikke tilstrekkelig beskrevet',
  [VedtaketFields.vedtaketDetErLagtTilGrunnFeilFaktum]: 'Det er lagt til grunn feil faktum',
  [VedtaketFields.vedtaketFeilKonkretRettsanvendelse]: 'Feil i den konkrete rettsanvendelsen',
  [VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelse]: 'Begrunnelsen er ikke konkret og individuell nok',
  [VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum]:
    'Det går ikke godt nok frem hva slags faktum som er lagt til grunn',
  [VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum]:
    'Det går ikke godt nok frem hvordan rettsregelen er anvendt på faktum',
  [VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst]: 'Det er mye standardtekst',
  [VedtaketFields.vedtaketSpraakOgFormidlingErIkkeTydelig]: 'Språket og formidlingen er ikke tydelig',

  [VedtaketFields.vedtaketBruktFeilHjemmelHjemlerList]: 'Hjemler for «Det er brukt feil hjemmel»',
  [VedtaketFields.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList]:
    'Hjemler for «Alle relevante hjemler er ikke vurdert»',
  [VedtaketFields.vedtaketLovbestemmelsenTolketFeilHjemlerList]: 'Hjemler for «Lovbestemmelsen er tolket feil»',
  [VedtaketFields.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList]:
    'Hjemler for «Innholdet i rettsreglene er ikke tilstrekkelig beskrevet»',
  [VedtaketFields.vedtaketFeilKonkretRettsanvendelseHjemlerList]: 'Hjemler for «Feil i den konkrete rettsanvendelsen»',
};

export const VEDTAKET_ERROR_LABELS: Record<VedtaketErrorFields, string> = {
  [VedtaketErrorFields.vedtaketGroup]: HEADER,
  [VedtaketErrorFields.vedtaketIkkeKonkretIndividuellBegrunnelseGroup]:
    VEDTAKET_LABELS[VedtaketFields.vedtaketIkkeKonkretIndividuellBegrunnelse],
};
