export enum PartEnum {
  PERSON = 'PERSON',
  VIRKSOMHET = 'VIRKSOMHET',
}

export const isPart = (s: string): s is PartEnum => Object.values(PartEnum).some((e) => e === s);
