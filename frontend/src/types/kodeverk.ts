import { PartEnum } from './part';
import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

export interface IKodeverkValue<T extends string = string> {
  id: T;
  navn: string;
  beskrivelse: string;
}

export interface ITema extends IKodeverkValue {
  hjemler: IKodeverkValue[];
  vedtaksenheter: IKodeverkValue[];
}

export interface IKodeverk {
  temaer: ITema[];
  utfall: IKodeverkValue<UtfallEnum>[];
  sakstyper: IKodeverkValue<SakstypeEnum>[];
  partIdTyper: IKodeverkValue<PartEnum>[];
  hjemler: IKodeverkValue[];
}
