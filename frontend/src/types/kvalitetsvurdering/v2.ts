import { IKvalitetsvurderingBase } from './common';

export interface IKvalitetsvurderingData {
  klageforberedelsen: boolean;
  hjemler: string[];
}

export interface IKvalitetsvurdering extends IKvalitetsvurderingData, IKvalitetsvurderingBase {
  version: 2;
}
