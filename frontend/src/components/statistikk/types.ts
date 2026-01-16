import { type IKodeverkSimpleValue, Ytelse } from '@app/types/kodeverk';
import type { ISaksdata } from '@app/types/statistics/common';
import type { IStatisticVurderingV1 } from '@app/types/statistics/v1';

export interface StatisticsPropsV1 {
  stats: IStatisticVurderingV1[];
}

export enum BehandlingstidEnum {
  TOTAL = 'total',
  KA = 'ka',
  VEDTAKSINSTANS = 'vedtaksinstans',
}

const VALUES = Object.values(BehandlingstidEnum);

export const isBehandlingstidEnum = (key: string | null): key is BehandlingstidEnum =>
  key !== null && VALUES.some((v) => v === key);

interface DataSet {
  label: string;
  data: ISaksdata[];
}

export interface ComparisonPropsV2 {
  stats: DataSet[];
}

enum Ytelsesgruppe {
  Bidragsområdet = '1',
  Foreldrepenger = '2',
  Etterlatteytelser = '3',
  GrunnOgHjelpestønad = '4',
  Hjelpemidler = '5',
  Oppfølgingssak = '6',
  SupplerendeStønad = '7',
  SykdomIFamilien = '8',
  Yrkesskade = '9',
}

const YTELSESGRUPPE_NAMES: Record<Ytelsesgruppe, string> = {
  [Ytelsesgruppe.Bidragsområdet]: 'Bidragsområdet',
  [Ytelsesgruppe.Foreldrepenger]: 'Foreldrepenger',
  [Ytelsesgruppe.Etterlatteytelser]: 'Etterlatteytelser',
  [Ytelsesgruppe.GrunnOgHjelpestønad]: 'Grunn- og hjelpestønad',
  [Ytelsesgruppe.Hjelpemidler]: 'Hjelpemidler',
  [Ytelsesgruppe.Oppfølgingssak]: 'Oppfølgingssak',
  [Ytelsesgruppe.SupplerendeStønad]: 'Supplerende stønad',
  [Ytelsesgruppe.SykdomIFamilien]: 'Sykdom i familien',
  [Ytelsesgruppe.Yrkesskade]: 'Yrkesskade',
};

export const YTELSESGRUPPE_OPTIONS = Object.entries(YTELSESGRUPPE_NAMES).map(([key, label]) => ({
  label,
  id: key,
}));

export const YTELSESGRUPPE_KODEVERK: IKodeverkSimpleValue[] = YTELSESGRUPPE_OPTIONS.map(({ id, label }) => ({
  id,
  navn: label,
}));

export const YTELSESGRUPPER: Record<Ytelsesgruppe, string[]> = {
  [Ytelsesgruppe.Bidragsområdet]: [
    Ytelse.BidragsområdetBarnebidrag,
    Ytelse.BidragsområdetBarnebortføring,
    Ytelse.BidragsområdetBidragsforskudd,
    Ytelse.BidragsområdetBidragsinnkreving,
    Ytelse.BidragsområdetEktefellebidrag,
    Ytelse.BidragsområdetFarOgMorskap,
    Ytelse.BidragsområdetOppfostringsbidrag,
  ],
  [Ytelsesgruppe.Foreldrepenger]: [
    Ytelse.ForeldrepengerEngangsstønad,
    Ytelse.ForeldrepengerForeldrepenger,
    Ytelse.ForeldrepengerSvangerskapspenger,
  ],
  [Ytelsesgruppe.Etterlatteytelser]: [
    Ytelse.EtterlatteYtelserGjenlevende,
    Ytelse.EtterlatteYtelserOmstillingsstønad,
    Ytelse.EtterlatteYtelserBarnepensjon,
  ],
  [Ytelsesgruppe.GrunnOgHjelpestønad]: [Ytelse.GrunnOgHjelpestønadGrunnstønad, Ytelse.GrunnOgHjelpestønadHjelpestønad],
  [Ytelsesgruppe.Hjelpemidler]: [
    Ytelse.HjelpemidlerBilOgMotorkjøretøy,
    Ytelse.HjelpemidlerOrtopediske,
    Ytelse.HjelpemidlerTekniske,
  ],
  [Ytelsesgruppe.Oppfølgingssak]: [Ytelse.OppfølgingssakNavLoven14a, Ytelse.OppfølgingssakTiltaksplass],
  [Ytelsesgruppe.SupplerendeStønad]: [Ytelse.SupplerendeStønad, Ytelse.SupplerendeStønadTilUføreFlyktninger],
  [Ytelsesgruppe.SykdomIFamilien]: [
    Ytelse.SykdomIFamilienOmsorgspenger,
    Ytelse.SykdomIFamilienOpplæringspenger,
    Ytelse.SykdomIFamilienPleiepengerILivetsSluttfase,
    Ytelse.SykdomIFamilienPleiepengerSyktBarn,
  ],
  [Ytelsesgruppe.Yrkesskade]: [
    Ytelse.YrkesskadeMenerstatning,
    Ytelse.YrkesskadeYrkesskade,
    Ytelse.YrkesskadeYrkessykdom,
  ],
};

const YTELSESGRUPPE_VALUES = Object.values(Ytelsesgruppe);

export const isYtelsesgruppe = (key: string): key is Ytelsesgruppe => YTELSESGRUPPE_VALUES.some((v) => v === key);
