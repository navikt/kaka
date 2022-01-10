export enum UtfallEnum {
  AVVIST = '8',
  DELVIS_MEDHOLD = '5',
  MEDHOLD = '4',
  OPPHEVET = '3',
  STADFESTELSE = '6',
  RETUR = '2',
  TRUKKET = '1',
  UGUNST = '7',
}

export const isUtfall = (s: string): s is UtfallEnum => Object.values(UtfallEnum).some((e) => e === s);
