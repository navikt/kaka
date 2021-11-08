import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

type UUID = string;

export interface ISaksdataBase {
  id: UUID;
  created: string; // LocalDateTime;
  modified: string; // LocalDateTime;
  hjemler: string[];
  avsluttetAvSaksbehandler: string | null; // LocalDateTime;
  tema: string | null;
  utfall: UtfallEnum | null;
  sakenGjelder: string | null;
  sakstype: SakstypeEnum | null;
}

export interface ISaksdata extends ISaksdataBase {
  kvalitetsvurderingId: string;
  mottattVedtaksinstans: string | null; // LocalDate;
  vedtaksinstansEnhet: string | null;
  mottattKlageinstans: string | null; // LocalDate;
  utfoerendeSaksbehandler: string;
}
