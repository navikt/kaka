import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

export const VIKAFOSSEN_ENHET = '2103';

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
  tema: IKodeverkValue[];
  hjemler: IKodeverkValue[];
  klageenheter: IKlageenhet[];
  enheter: IKodeverkValue[];
  utfall: IKodeverkSimpleValue<UtfallEnum>[];
  sakstyper: IKodeverkSimpleValue<SakstypeEnum>[];
  sources: IKodeverkSimpleValue[];
}
