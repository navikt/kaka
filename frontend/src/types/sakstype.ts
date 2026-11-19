import { IS_2027_OR_LATER } from '@app/components/filters/date-presets/constants';

export enum SakstypeEnum {
  KLAGE = '1',
  ANKE = '2',
  ANKE_I_TRYGDERETTEN = '3',
  BEHANDLING_ETTER_TR_OPPHEVET = '4',
  OMGJØRINGSKRAV = '5',
  BEGJÆRING_OM_GJENOPPTAK = '6',
  BEGJÆRING_OM_GJENOPPTAK_I_TR = '7',
  ANKE_AFTER_2027 = '8',
  ANKE_I_TR_AFTER_2027 = '9',
  BEGJÆRING_OM_GJENOPPTAK_AFTER_2027 = '10',
  BEGJÆRING_OM_GJENOPPTAK_I_TR_AFTER_2027 = '11',
}

const SAKSTYPER = Object.values(SakstypeEnum);

export const isSakstype = (type: string): type is SakstypeEnum => SAKSTYPER.some((sakstype) => sakstype === type);

const PRE_2027_SAKSTYPER = [
  SakstypeEnum.KLAGE,
  SakstypeEnum.ANKE,
  SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET,
  SakstypeEnum.OMGJØRINGSKRAV,
  SakstypeEnum.BEGJÆRING_OM_GJENOPPTAK,
];

const POST_2027_SAKSTYPER = [SakstypeEnum.ANKE_AFTER_2027, SakstypeEnum.BEGJÆRING_OM_GJENOPPTAK_AFTER_2027];

// TODO: Cleanup when 2027 is reached
export const RELEVANT_SAKSTYPER: SakstypeEnum[] = IS_2027_OR_LATER
  ? [...PRE_2027_SAKSTYPER, ...POST_2027_SAKSTYPER]
  : PRE_2027_SAKSTYPER;
