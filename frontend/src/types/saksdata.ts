import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

type UUID = string;

// Search types.
export interface ISaksdataSearchHitBase {
  id: UUID;
  created: string; // LocalDateTime;
  modified: string; // LocalDateTime;
  tilknyttetEnhet: string;
  hjemmelIdList: string[];
  sakstypeId: SakstypeEnum;
  sourceId: string;
  kvalitetsvurderingId: string;
}

export interface ISaksdataCompleteSearchHit extends ISaksdataSearchHitBase {
  avsluttetAvSaksbehandler: string; // LocalDateTime;
  ytelseId: string;
  utfallId: UtfallEnum;
  sakenGjelder: string;
}

export interface ISaksdataIncompleteSearchHit extends ISaksdataSearchHitBase {
  avsluttetAvSaksbehandler: null; // LocalDateTime;
  ytelseId: string | null;
  utfallId: UtfallEnum | null;
  sakenGjelder: string | null;
}

// Full types.
interface ISaksdataBase extends ISaksdataSearchHitBase {
  utfoerendeSaksbehandler: string;
}

export interface ISaksdataComplete extends ISaksdataBase, ISaksdataCompleteSearchHit {
  mottattKlageinstans: string;
  mottattVedtaksinstans: string;
  vedtaksinstansEnhet: string;
}

export interface ISaksdataIncomplete extends ISaksdataBase, ISaksdataIncompleteSearchHit {
  mottattKlageinstans: string | null;
  mottattVedtaksinstans: string | null;
  vedtaksinstansEnhet: string | null;
}

// API IO types.
export interface ISaksdatalisteLederVedtaksinstansParams {
  navIdent: string;
  fromDate: string;
  toDate: string;
  mangelfullt: string[];
  kommentarer: string[];
}

export interface ISaksdatalisteLederVedtaksinstans {
  searchHits: ISaksdataCompleteSearchHit[];
}
