import { IKodeverkValue } from './kodeverk';

export interface Navn {
  fornavn?: string;
  etternavn?: string;
  sammensattNavn?: string;
}

export interface IUser {
  ident: string;
  navn: Navn;
  klageenheter: IKodeverkValue[];
  roller: Role[];
  ansattEnhet: IKodeverkValue;
}

export enum Role {
  ROLE_KAKA_KVALITETSVURDERING = 'ROLE_KAKA_KVALITETSVURDERING',
  ROLE_KAKA_TOTALSTATISTIKK = 'ROLE_KAKA_TOTALSTATISTIKK',
  ROLE_KAKA_LEDERSTATISTIKK = 'ROLE_KAKA_LEDERSTATISTIKK',
  ROLE_KAKA_KVALITETSTILBAKEMELDINGER = 'ROLE_KAKA_KVALITETSTILBAKEMELDINGER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_KLAGE_STRENGT_FORTROLIG = 'ROLE_KLAGE_STRENGT_FORTROLIG',
  ROLE_KAKA_SAKSBEHANDLER = 'ROLE_KAKA_SAKSBEHANDLER', // TODO: Remove. Replaced by ROLE_KAKA_KVALITETSVURDERING.
  ROLE_KLAGE_LEDER = 'ROLE_KLAGE_LEDER', // TODO: Remove. Replaced by ROLE_KAKA_LEDERSTATISTIKK.
  ROLE_VEDTAKSINSTANS_LEDER = 'ROLE_VEDTAKSINSTANS_LEDER', // TODO: Remove. Replaced by ROLE_KAKA_KVALITETSTILBAKEMELDINGER.
}
