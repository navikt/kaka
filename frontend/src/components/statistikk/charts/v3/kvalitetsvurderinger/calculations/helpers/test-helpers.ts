import { Radiovalg, RadiovalgExtended } from '@app/types/kvalitetsvurdering/radio';
import { SakstypeEnum } from '@app/types/sakstype';
import type { StatsDate } from '@app/types/statistics/common';
import type { IStatisticVurderingV3 } from '@app/types/statistics/v3';
import { UtfallEnum } from '@app/types/utfall';

const DEFAULT_DATE: StatsDate = {
  weekNumber: 12,
  year: 2023,
  month: 3,
  day: 23,
  iso: '2023-03-23',
  epochDay: 19439,
};

const DEFAULT_STAT: IStatisticVurderingV3 = {
  // Saksdata
  id: '',
  createdDate: DEFAULT_DATE,
  modifiedDate: DEFAULT_DATE,
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

  // Særregelverket
  saerregelverkLovenErTolketEllerAnvendtFeil: false,
  saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkning: false,
  saerregelverkVedtaketByggerPaaFeilHjemmelEllerLovtolkningHjemlerList: [],
  saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoenn: false,
  saerregelverkVedtaketByggerPaaFeilKonkretRettsanvendelseEllerSkjoennHjemlerList: [],
  saerregelverkDetErLagtTilGrunnFeilFaktum: false,
  saerregelverkDetErLagtTilGrunnFeilFaktumHjemlerList: [],
  saerregelverkAutomatiskVedtak: false,
  saerregelverk: Radiovalg.BRA,

  // Saksbehandlingsreglene - Veiledningsplikten
  saksbehandlingsreglerBruddPaaVeiledningsplikten: false,
  saksbehandlingsreglerVeiledningspliktenPartenHarIkkeFaattSvarPaaHenvendelser: false,
  saksbehandlingsreglerVeiledningspliktenNavHarIkkeGittGodNokVeiledning: false,

  // Saksbehandlingsreglene - Utredningsplikten
  saksbehandlingsreglerBruddPaaUtredningsplikten: false,
  saksbehandlingsreglerUtredningspliktenUtredningenAvMedisinskeForholdHarIkkeVaertGodNok: false,
  saksbehandlingsreglerUtredningspliktenUtredningenAvInntektsArbeidsforholdHarIkkeVaertGodNok: false,
  saksbehandlingsreglerUtredningspliktenUtredningenAvEoesUtenlandsforholdHarIkkeVaertGodNok: false,
  saksbehandlingsreglerUtredningspliktenUtredningenAvSivilstandsBoforholdHarIkkeVaertGodNok: false,
  saksbehandlingsreglerUtredningspliktenUtredningenAvSamvaersforholdHarIkkeVaertGodNok: false,
  saksbehandlingsreglerUtredningspliktenUtredningenAvAndreForholdISakenHarIkkeVaertGodNok: false,

  // Saksbehandlingsreglene - Foreleggelsesplikten
  saksbehandlingsreglerBruddPaaForeleggelsesplikten: false,
  saksbehandlingsreglerForeleggelsespliktenUttalelseFraRaadgivendeLegeHarIkkeVaertForelagtParten: false,
  saksbehandlingsreglerForeleggelsespliktenAndreOpplysningerISakenHarIkkeVaertForelagtParten: false,

  // Saksbehandlingsreglene - Begrunnelsesplikten
  saksbehandlingsreglerBruddPaaBegrunnelsesplikten: false,
  saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverket: false,
  saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenViserIkkeTilRegelverketHjemlerList: [],
  saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktum: false,
  saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeFaktumHjemlerList: [],
  saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensyn: false,
  saksbehandlingsreglerBegrunnelsespliktenBegrunnelsenNevnerIkkeAvgjoerendeHensynHjemlerList: [],

  // Saksbehandlingsreglene - Klage og klageforberedelse
  saksbehandlingsreglerBruddPaaRegleneOmKlageOgKlageforberedelse: false,
  saksbehandlingsreglerBruddPaaKlageKlagefristenEllerOppreisningErIkkeVurdertEllerFeilVurdert: false,
  saksbehandlingsreglerBruddPaaKlageDetErIkkeSoergetForRettingAvFeilIKlagensFormEllerInnhold: false,
  saksbehandlingsreglerBruddPaaKlageUnderKlageforberedelsenErDetIkkeUtredetEllerGjortUndersoekelser: false,

  // Saksbehandlingsreglene - Omgjøring
  saksbehandlingsreglerBruddPaaRegleneOmOmgjoeringUtenforKlageOgAnke: false,
  saksbehandlingsreglerOmgjoeringUgyldighetOgOmgjoeringErIkkeVurdertEllerFeilVurdert: false,
  saksbehandlingsreglerOmgjoeringDetErFattetVedtakTilTrossForAtBeslutningVarRiktigAvgjoerelsesform: false,

  // Saksbehandlingsreglene - Journalføringsplikten
  saksbehandlingsreglerBruddPaaJournalfoeringsplikten: false,
  saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerErIkkeJournalfoert: false,
  saksbehandlingsreglerJournalfoeringspliktenRelevanteOpplysningerHarIkkeGodNokTittelEllerDokumentkvalitet: false,

  // Saksbehandlingsreglene - Klart språk
  saksbehandlingsreglerBruddPaaPliktTilAaKommuniserePaaEtKlartSpraak: false,
  saksbehandlingsreglerBruddPaaKlartSprakSpraketIVedtaketErIkkeKlartNok: false,
  saksbehandlingsreglerBruddPaaKlartSprakSpraketIOversendelsesbrevetsErIkkeKlartNok: false,

  saksbehandlingsregler: Radiovalg.BRA,

  // Trygdemedisin
  raadgivendeLegeIkkebrukt: false,
  raadgivendeLegeMangelfullBrukAvRaadgivendeLege: false,
  raadgivendeLegeUttaltSegOmTemaUtoverTrygdemedisin: false,
  raadgivendeLegeBegrunnelseMangelfullEllerIkkeDokumentert: false,
  brukAvRaadgivendeLege: RadiovalgExtended.BRA,
};

interface IPartialStats
  extends Omit<Partial<IStatisticVurderingV3>, 'avsluttetAvSaksbehandler' | 'createdDate' | 'modifiedDate'> {
  avsluttetAvSaksbehandler?: Partial<IStatisticVurderingV3['avsluttetAvSaksbehandler']>;
  createdDate?: Partial<IStatisticVurderingV3['createdDate']>;
  modifiedDate?: Partial<IStatisticVurderingV3['modifiedDate']>;
}

export const getStats = (partialStats: IPartialStats): IStatisticVurderingV3 => ({
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
