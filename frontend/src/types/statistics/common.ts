import { SakstypeEnum } from '../sakstype';
import { UtfallEnum } from '../utfall';

export type UUID = string;

interface Date {
  readonly weekNumber: number;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly iso: string;
  readonly epochDay: number;
}

export interface ISaksdata {
  readonly avsluttetAvSaksbehandler: Date;
  readonly kaBehandlingstidDays: number;
  readonly vedtaksinstansBehandlingstidDays: number;
  readonly totalBehandlingstidDays: number;
  readonly hjemmelIdList: string[];
  readonly mottattKlageinstans: Date | null;
  readonly mottattVedtaksinstans: Date | null;
  readonly sakstypeId: SakstypeEnum;
  readonly utfallId: UtfallEnum;
  readonly ytelseId: string;
}

export interface ISaksbehandler {
  navIdent: string;
  navn: string;
}
