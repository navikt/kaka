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
  roller: string[];
  ansattEnhet: IKodeverkValue;
}

export enum Role {
  ROLE_KLAGE_FAGANSVARLIG = 'ROLE_KLAGE_FAGANSVARLIG',
  ROLE_KLAGE_LEDER = 'ROLE_KLAGE_LEDER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_KLAGE_STRENGT_FORTROLIG = 'ROLE_KLAGE_STRENGT_FORTROLIG',
  ROLE_KLAGE_SAKSBEHANDLER = 'ROLE_KLAGE_SAKSBEHANDLER',
}
