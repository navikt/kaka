import type { SakstypeEnum } from './sakstype';
import type { UtfallEnum } from './utfall';

type UUID = string;

export enum KvalitetsvurderingVersion {
  V1 = 1,
  V2 = 2,
}

export interface ISaksdataBase {
  id: UUID;
  created: string; // LocalDateTime;
  modified: string; // LocalDateTime;
  tilknyttetEnhet: string;
  hjemmelIdList: string[];
  sakstypeId: SakstypeEnum;
  sourceId: string;
  utfoerendeSaksbehandler: string;
  kvalitetsvurderingReference: {
    id: UUID;
    version: KvalitetsvurderingVersion;
  };
  tilbakekreving: boolean;
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
export interface ISaksdatalisteLederVedtaksinstansParamsV2 {
  navIdent: string;
  fromDate: string;
  toDate: string;
  mangelfullt: string[];
}

export interface ISaksdatalisteLederVedtaksinstansParamsV1 extends ISaksdatalisteLederVedtaksinstansParamsV2 {
  kommentarer: string[];
}

export interface ISaksdatalisteLederVedtaksinstans {
  searchHits: ISaksdataComplete[];
}
