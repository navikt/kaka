import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { SakstypeEnum } from '@app/types/sakstype';
import type { StatsDate } from '@app/types/statistics/common';
import type { IStatisticVurderingV2 } from '@app/types/statistics/v2';
import { UtfallEnum } from '@app/types/utfall';

const DEFAULT_DATE: StatsDate = {
  weekNumber: 12,
  year: 2023,
  month: 3,
  day: 23,
  iso: '2023-03-23',
  epochDay: 19439,
};

const DEFAULT_STAT: IStatisticVurderingV2 = {
  id: '',
  createdDate: DEFAULT_DATE,
  modifiedDate: DEFAULT_DATE,
  klageforberedelsenSakensDokumenter: false,
  klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert: false,
  klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn: false,
  klageforberedelsenSakensDokumenterManglerFysiskSaksmappe: false,
  klageforberedelsen: Radiovalg.BRA,

  klageforberedelsenOversittetKlagefristIkkeKommentert: false,
  klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt: false,
  klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar: false,
  klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema: false,
  klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker: false,
  klageforberedelsenUtredningenUnderKlageforberedelsen: false,
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger: false,
  klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger: false,
  utredningen: Radiovalg.BRA,
  utredningenAvMedisinskeForhold: false,
  utredningenAvInntektsforhold: false,
  utredningenAvArbeidsaktivitet: false,
  utredningenAvEoesUtenlandsproblematikk: false,
  utredningenAvSivilstandBoforhold: false,
  utredningenAvAndreAktuelleForholdISaken: false,
  vedtaketLovbestemmelsenTolketFeil: false,
  vedtaketLovbestemmelsenTolketFeilHjemlerList: [],
  vedtaketBruktFeilHjemmel: false,
  vedtaketBruktFeilHjemmelHjemlerList: [],
  vedtaketAlleRelevanteHjemlerErIkkeVurdert: false,
  vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList: [],
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert: false,
  vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList: [],
  vedtaketFeilKonkretRettsanvendelse: false,
  vedtaketFeilKonkretRettsanvendelseHjemlerList: [],
  vedtaketIkkeKonkretIndividuellBegrunnelse: false,
  vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum: false,
  vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum: false,
  vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst: false,
  vedtaketAutomatiskVedtak: false,
  vedtaket: Radiovalg.BRA,
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet: false,
  vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList: [],
  vedtaketDetErLagtTilGrunnFeilFaktum: false,
  vedtaketSpraakOgFormidlingErIkkeTydelig: false,
  raadgivendeLegeIkkebrukt: false,
  raadgivendeLegeMangelfullBrukAvRaadgivendeLege: false,
  raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin: false,
  raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert: false,
  brukAvRaadgivendeLege: null,
  kaBehandlingstidDays: 0,
  vedtaksinstansBehandlingstidDays: 0,
  totalBehandlingstidDays: 0,
  avsluttetAvSaksbehandler: DEFAULT_DATE,
  hjemmelIdList: [],
  mottattKlageinstans: null,
  mottattVedtaksinstans: null,
  ytelseId: '',
  utfallId: UtfallEnum.MEDHOLD,
  sakstypeId: SakstypeEnum.KLAGE,
  tilbakekreving: false,
};

interface IPartialStats
  extends Omit<Partial<IStatisticVurderingV2>, 'avsluttetAvSaksbehandler' | 'createdDate' | 'modifiedDate'> {
  avsluttetAvSaksbehandler?: Partial<IStatisticVurderingV2['avsluttetAvSaksbehandler']>;
  createdDate?: Partial<IStatisticVurderingV2['createdDate']>;
  modifiedDate?: Partial<IStatisticVurderingV2['modifiedDate']>;
}

export const getStats = (partialStats: IPartialStats): IStatisticVurderingV2 => ({
  ...DEFAULT_STAT,
  ...partialStats,
  createdDate: {
    ...DEFAULT_STAT.createdDate,
    ...partialStats.createdDate,
  },
  modifiedDate: {
    ...DEFAULT_STAT.modifiedDate,
    ...partialStats.modifiedDate,
  },
  avsluttetAvSaksbehandler: {
    ...DEFAULT_STAT.avsluttetAvSaksbehandler,
    ...partialStats.avsluttetAvSaksbehandler,
  },
});
