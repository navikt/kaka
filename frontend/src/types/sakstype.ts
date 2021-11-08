export enum SakstypeEnum {
  KLAGE = '1',
  ANKE = '2',
}

export const isSakstype = (s: string): s is SakstypeEnum => Object.values(SakstypeEnum).some((e) => e === s);
