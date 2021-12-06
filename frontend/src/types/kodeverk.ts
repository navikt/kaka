import { PartEnum } from './part';
import { ILovKildeToRegistreringshjemmel } from './registreringshjemmel';
import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

export interface IKodeverkValue<T extends string = string> {
  id: T;
  navn: string;
  beskrivelse: string;
}

export interface IYtelse extends IKodeverkValue {
  hjemler: IKodeverkValue[];
  enheter: IKodeverkValue[];
  lovKildeToRegistreringshjemler: ILovKildeToRegistreringshjemmel[];
}

export interface IKodeverk {
  ytelser: IYtelse[];
  utfall: IKodeverkValue<UtfallEnum>[];
  sakstyper: IKodeverkValue<SakstypeEnum>[];
  partIdTyper: IKodeverkValue<PartEnum>[];
  hjemler: IKodeverkValue[];
}
