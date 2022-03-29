import { IKodeverkSimpleValue } from './kodeverk';

export interface Navn {
  fornavn?: string;
  etternavn?: string;
  sammensattNavn?: string;
}

export interface IUser {
  ident: string;
  navn: Navn;
  roller: Role[];
  ansattEnhet: IKodeverkSimpleValue;
}

export enum Role {
  ROLE_KAKA_KVALITETSVURDERING = 'ROLE_KAKA_KVALITETSVURDERING',
  ROLE_KAKA_TOTALSTATISTIKK = 'ROLE_KAKA_TOTALSTATISTIKK',
  ROLE_KAKA_LEDERSTATISTIKK = 'ROLE_KAKA_LEDERSTATISTIKK',
  ROLE_KAKA_KVALITETSTILBAKEMELDINGER = 'ROLE_KAKA_KVALITETSTILBAKEMELDINGER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_KLAGE_STRENGT_FORTROLIG = 'ROLE_KLAGE_STRENGT_FORTROLIG',
}
