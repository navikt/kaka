import { IKodeverkSimpleValue } from './kodeverk';

interface Navn {
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
  KAKA_KVALITETSVURDERING = 'KAKA_KVALITETSVURDERING',
  KAKA_TOTALSTATISTIKK = 'KAKA_TOTALSTATISTIKK',
  KAKA_LEDERSTATISTIKK = 'KAKA_LEDERSTATISTIKK',
  KAKA_KVALITETSTILBAKEMELDINGER = 'KAKA_KVALITETSTILBAKEMELDINGER',
  EGEN_ANSATT = 'EGEN_ANSATT',
  FORTROLIG = 'FORTROLIG',
  STRENGT_FORTROLIG = 'STRENGT_FORTROLIG',
  ROLE_KLAGE_LEDER = 'ROLE_KLAGE_LEDER', // Will be replaced by KAKA_EXCEL_UTTREKK_MED_FRITEKST.
  // KAKA_EXCEL_UTTREKK_UTEN_FRITEKST will also be added to the list of roles.
  KAKA_ADMIN = 'KAKA_ADMIN',
}
