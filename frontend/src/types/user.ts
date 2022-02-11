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
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_KAKA_SAKSBEHANDLER = 'ROLE_KAKA_SAKSBEHANDLER',
  ROLE_KLAGE_LEDER = 'ROLE_KLAGE_LEDER',
  ROLE_KLAGE_STRENGT_FORTROLIG = 'ROLE_KLAGE_STRENGT_FORTROLIG',
  ROLE_VEDTAKSINSTANS_LEDER = 'ROLE_VEDTAKSINSTANS_LEDER',
}
