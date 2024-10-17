export enum SakstypeEnum {
  KLAGE = '1',
  ANKE = '2',
  ANKE_I_TRYGDERETTEN = '3',
  BEHANDLING_ETTER_TR_OPPHEVET = '4',
}

const SAKSTYPER = Object.values(SakstypeEnum);

export const isSakstype = (type: string): type is SakstypeEnum => SAKSTYPER.some((sakstype) => sakstype === type);
