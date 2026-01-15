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

enum Ytelsegruppe {
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

const YTELSEGRUPPE_NAMES: Record<Ytelsegruppe, string> = {
  [Ytelsegruppe.Bidragsområdet]: 'Bidragsområdet',
  [Ytelsegruppe.Foreldrepenger]: 'Foreldrepenger',
  [Ytelsegruppe.Etterlatteytelser]: 'Etterlatteytelser',
  [Ytelsegruppe.GrunnOgHjelpestønad]: 'Grunn- og hjelpestønad',
  [Ytelsegruppe.Hjelpemidler]: 'Hjelpemidler',
  [Ytelsegruppe.Oppfølgingssak]: 'Oppfølgingssak',
  [Ytelsegruppe.SupplerendeStønad]: 'Supplerende stønad',
  [Ytelsegruppe.SykdomIFamilien]: 'Sykdom i familien',
  [Ytelsegruppe.Yrkesskade]: 'Yrkesskade',
};

export const YTELSEGRUPPE_OPTIONS = Object.entries(YTELSEGRUPPE_NAMES).map(([key, label]) => ({
  label,
  id: key,
}));

export const YTELSEGRUPPE_KODEVERK: IKodeverkSimpleValue[] = YTELSEGRUPPE_OPTIONS.map(({ id, label }) => ({
  id,
  navn: label,
}));

export const YTELSEGRUPPER: Record<Ytelsegruppe, string[]> = {
  [Ytelsegruppe.Bidragsområdet]: [
    Ytelse.BidragsområdetBarnebidrag,
    Ytelse.BidragsområdetBarnebortføring,
    Ytelse.BidragsområdetBidragsforskudd,
    Ytelse.BidragsområdetBidragsinnkreving,
    Ytelse.BidragsområdetEktefellebidrag,
    Ytelse.BidragsområdetFarOgMorskap,
    Ytelse.BidragsområdetOppfostringsbidrag,
  ],
  [Ytelsegruppe.Foreldrepenger]: [
    Ytelse.ForeldrepengerEngangsstønad,
    Ytelse.ForeldrepengerForeldrepenger,
    Ytelse.ForeldrepengerSvangerskapspenger,
  ],
  [Ytelsegruppe.Etterlatteytelser]: [
    Ytelse.EtterlatteYtelserGjenlevende,
    Ytelse.EtterlatteYtelserOmstillingsstønad,
    Ytelse.EtterlatteYtelserBarnepensjon,
  ],
  [Ytelsegruppe.GrunnOgHjelpestønad]: [Ytelse.GrunnOgHjelpestønadGrunnstønad, Ytelse.GrunnOgHjelpestønadHjelpestønad],
  [Ytelsegruppe.Hjelpemidler]: [
    Ytelse.HjelpemidlerBilOgMotorkjøretøy,
    Ytelse.HjelpemidlerOrtopediske,
    Ytelse.HjelpemidlerTekniske,
  ],
  [Ytelsegruppe.Oppfølgingssak]: [Ytelse.OppfølgingssakNavLoven14a, Ytelse.OppfølgingssakTiltaksplass],
  [Ytelsegruppe.SupplerendeStønad]: [Ytelse.SupplerendeStønad, Ytelse.SupplerendeStønadTilUføreFlyktninger],
  [Ytelsegruppe.SykdomIFamilien]: [
    Ytelse.SykdomIFamilienOmsorgspenger,
    Ytelse.SykdomIFamilienOpplæringspenger,
    Ytelse.SykdomIFamilienPleiepengerILivetsSluttfase,
    Ytelse.SykdomIFamilienPleiepengerSyktBarn,
  ],
  [Ytelsegruppe.Yrkesskade]: [
    Ytelse.YrkesskadeMenerstatning,
    Ytelse.YrkesskadeYrkesskade,
    Ytelse.YrkesskadeYrkessykdom,
  ],
};

const YTELSEGRUPPE_VALUES = Object.values(Ytelsegruppe);

export const isYtelsegruppe = (key: string): key is Ytelsegruppe => YTELSEGRUPPE_VALUES.some((v) => v === key);
