import type { SakstypeEnum } from './sakstype';
import type { UtfallEnum } from './utfall';

export interface IKodeverkSimpleValue<T extends string = string> {
  id: T;
  navn: string;
}

export interface IKodeverkValue<T extends string = string> extends IKodeverkSimpleValue<T> {
  beskrivelse: string;
}

export interface ILovKildeToRegistreringshjemmel {
  lovkilde: IKodeverkValue;
  registreringshjemler: IKodeverkSimpleValue[];
}

export interface IYtelse extends IKodeverkSimpleValue {
  enheter: IKodeverkSimpleValue[];
  klageenheter: IKodeverkSimpleValue[];
  lovKildeToRegistreringshjemler: ILovKildeToRegistreringshjemmel[];
  innsendingshjemler: IKodeverkValue[];
}

export interface IKlageenhet extends IKodeverkSimpleValue {
  ytelser: IKodeverkSimpleValue[];
}

export interface ISakstyperToUtfall extends IKodeverkSimpleValue<SakstypeEnum> {
  utfall: IKodeverkSimpleValue<UtfallEnum>[];
}
