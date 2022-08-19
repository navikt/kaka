import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

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
}

export interface IKlageenhet extends IKodeverkSimpleValue {
  ytelser: IKodeverkSimpleValue[];
}

export interface IKodeverk {
  ytelser: IYtelse[];
  tema: IKodeverkValue[];
  hjemler: IKodeverkValue[];
  klageenheter: IKlageenhet[];
  styringsenheter: IKodeverkSimpleValue[];
  vedtaksenheter: IKodeverkSimpleValue[];
  enheter: IKodeverkSimpleValue[];
  utfall: IKodeverkSimpleValue<UtfallEnum>[];
  sakstyper: IKodeverkSimpleValue<SakstypeEnum>[];
  sources: IKodeverkSimpleValue[];
  brevmottakertyper: IKodeverkSimpleValue[];
}
