import { SakstypeEnum } from './sakstype';
import { UtfallEnum } from './utfall';

type UUID = string;

type KvalitetsvurderingVersion = 1 | 2;

export interface ISaksdataBase {
  id: UUID;
  created: string; // LocalDateTime;
  modified: string; // LocalDateTime;
  tilknyttetEnhet: string;
  hjemmelIdList: string[];
  sakstypeId: SakstypeEnum;
  sourceId: string;
  kvalitetsvurderingId: string;
  utfoerendeSaksbehandler: string;
  kvalitetsvurderingReference: {
    id: UUID;
    version: KvalitetsvurderingVersion;
  };
}

export interface ISaksdataComplete extends ISaksdataBase {
  avsluttetAvSaksbehandler: string; // LocalDateTime;
  ytelseId: string;
  utfallId: UtfallEnum;
  sakenGjelder: string;
  mottattKlageinstans: string;
  mottattVedtaksinstans: string;
  vedtaksinstansEnhet: string;
}

export interface ISaksdataIncomplete extends ISaksdataBase {
  avsluttetAvSaksbehandler: null; // LocalDateTime;
  ytelseId: string | null;
  utfallId: UtfallEnum | null;
  sakenGjelder: string | null;
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
  searchHits: ISaksdataComplete[];
}
