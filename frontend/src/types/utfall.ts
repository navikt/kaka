export enum UtfallEnum {
  TRUKKET = '1',
  RETUR = '2',
  OPPHEVET = '3',
  MEDHOLD = '4',
  DELVIS_MEDHOLD = '5',
  STADFESTELSE = '6',
  UGUNST = '7',
  AVVIST = '8',
  INNSTILLING_STADFESTELSE = '9',
  INNSTILLING_AVVIST = '10',
}

export const isUtfall = (s: string): s is UtfallEnum => Object.values(UtfallEnum).some((e) => e === s);
