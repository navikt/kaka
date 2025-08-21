import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import type { SakstypeEnum } from '../sakstype';
import type { UtfallEnum } from '../utfall';

export type UUID = string;

export interface StatsDate {
  readonly weekNumber: number;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly iso: string;
  readonly epochDay: number;
}

export interface ISaksdata {
  readonly avsluttetAvSaksbehandler: StatsDate;
  readonly kaBehandlingstidDays: number;
  readonly vedtaksinstansBehandlingstidDays: number;
  readonly totalBehandlingstidDays: number;
  readonly hjemmelIdList: string[];
  readonly mottattKlageinstans: StatsDate | null;
  readonly mottattVedtaksinstans: StatsDate | null;
  readonly sakstypeId: SakstypeEnum;
  readonly utfallId: UtfallEnum;
  readonly ytelseId: string;
  readonly createdDate: StatsDate;
  readonly modifiedDate: StatsDate;
  readonly tilbakekreving: boolean;
}

export interface ISaksbehandler {
  navIdent: string;
  navn: string;
}

export type OptionValue = [string, ColorToken];
