import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

type UUID = string;

export interface ISaksdataBase {
  id: UUID;
  created: string; // LocalDateTime;
  modified: string; // LocalDateTime;
  tilknyttetEnhet: string;
  hjemmelIdList: string[];
  avsluttetAvSaksbehandler: string | null; // LocalDateTime;
  ytelseId: string | null;
  utfallId: UtfallEnum | null;
  sakenGjelder: string | null;
  sakstypeId: SakstypeEnum;
}

export interface ISaksdata extends ISaksdataBase {
  kvalitetsvurderingId: string;
  mottattVedtaksinstans: string | null; // LocalDate;
  vedtaksinstansEnhet: string | null;
  mottattKlageinstans: string | null; // LocalDate;
  utfoerendeSaksbehandler: string;
}
