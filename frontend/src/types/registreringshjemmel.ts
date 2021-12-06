import { IKodeverkValue } from './kodeverk';

export interface IRegistreringshjemmel {
  id: string;
  navn: string;
}

export interface ILovKildeToRegistreringshjemmel {
  lovkilde: IKodeverkValue;
  registreringshjemler: IRegistreringshjemmel[];
}
