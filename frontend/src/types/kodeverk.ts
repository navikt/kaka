import { ILovKildeToRegistreringshjemmel } from './registreringshjemmel';
import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

export interface IKodeverkValue<T extends string = string> {
  id: T;
  navn: string;
  beskrivelse: string;
}

export interface IYtelse extends IKodeverkValue {
  enheter: IKodeverkValue[];
  klageenheter: IKodeverkValue[];
  lovKildeToRegistreringshjemler: ILovKildeToRegistreringshjemmel[];
}

export interface IKlageenhet extends IKodeverkValue {
  ytelser: IKodeverkValue[];
}

export interface IKodeverk {
  ytelser: IYtelse[];
  utfall: IKodeverkValue<UtfallEnum>[];
  sakstyper: IKodeverkValue<SakstypeEnum>[];
  enheter: IKodeverkValue[];
  klageenheter: IKlageenhet[];
}
