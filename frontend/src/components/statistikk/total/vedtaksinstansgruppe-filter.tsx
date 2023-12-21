import React from 'react';
import { Filter } from '../../filters/common/filter';
import { FilterType } from '../../filters/types';

export enum Fylke {
  AKERSHUS = 'akershus',
  OSLO = 'oslo',
  VESTLAND = 'vestland',
  ROGALAND = 'rogaland',
  TRØNDELAG = 'trøndelag',
  INNLANDET = 'innlandet',
  AGDER = 'agder',
  ØSTFOLD = 'østfold',
  MØRE_OG_ROMSDAL = 'møre_og_romsdal',
  BUSKERUD = 'buskerud',
  VESTFOLD = 'vestfold',
  NORDLAND = 'nordland',
  TELEMARK = 'telemark',
  TROMS = 'troms',
  FINNMARK = 'finnmark',
}

export enum Vedtaksinstans {
  NAV_ØKONOMI_STØNAD = 'nav_økonomi_stønad',
  NAV_ARBEID_OG_YTELSER = 'nav_arbeid_og_ytelser',
  NAV_KONTROLL_FORVALTNING = 'nav_kontroll_forvaltning',
  NAV_HJELPEMIDDELSENTRAL = 'nav_hjelpemiddelsentral',
  NAV_FAMILIE_OG_PENSJONSYTELSER = 'nav_familie_og_pensjonsytelser',
}

export const VEDTAKSINSTANSGRUPPE_FILTERS: FilterType[] = [
  // Fylker
  { id: Fylke.AGDER, label: 'Agder' },
  { id: Fylke.AKERSHUS, label: 'Akershus' },
  { id: Fylke.BUSKERUD, label: 'Buskerud' },
  { id: Fylke.FINNMARK, label: 'Finnmark' },
  { id: Fylke.INNLANDET, label: 'Innlandet' },
  { id: Fylke.MØRE_OG_ROMSDAL, label: 'Møre og Romsdal' },
  { id: Fylke.NORDLAND, label: 'Nordland' },
  { id: Fylke.OSLO, label: 'Oslo' },
  { id: Fylke.ROGALAND, label: 'Rogaland' },
  { id: Fylke.TELEMARK, label: 'Telemark' },
  { id: Fylke.TROMS, label: 'Troms' },
  { id: Fylke.TRØNDELAG, label: 'Trøndelag' },
  { id: Fylke.VESTFOLD, label: 'Vestfold' },
  { id: Fylke.VESTLAND, label: 'Vestland' },
  { id: Fylke.ØSTFOLD, label: 'Østfold' },

  // Vedtaksinstansgrupper
  { id: Vedtaksinstans.NAV_ARBEID_OG_YTELSER, label: 'NAV Arbeid og ytelser' },
  { id: Vedtaksinstans.NAV_FAMILIE_OG_PENSJONSYTELSER, label: 'NAV Familie- og pensjonsytelser' },
  { id: Vedtaksinstans.NAV_HJELPEMIDDELSENTRAL, label: 'NAV Hjelpemiddelsentral' },
  { id: Vedtaksinstans.NAV_KONTROLL_FORVALTNING, label: 'NAV Kontroll Forvaltning' },
  { id: Vedtaksinstans.NAV_ØKONOMI_STØNAD, label: 'NAV Økonomi Stønad' },
];

const FYLKE_VALUES = Object.values(Fylke);
export const isFylke = (fylke: string): fylke is Fylke => FYLKE_VALUES.some((value) => value === fylke);

const VEDTAKSINSTANSGRUPPE_VALUES = Object.values(Vedtaksinstans);
export const isVedtaksinstansgruppe = (vedtaksinstansgruppe: string): vedtaksinstansgruppe is Vedtaksinstans =>
  VEDTAKSINSTANSGRUPPE_VALUES.some((value) => value === vedtaksinstansgruppe);

interface Props {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const VedtaksinstansgruppeFilter = ({ selected, setSelected }: Props) => (
  <Filter
    label="Vedtaksinstansgruppe"
    selected={selected}
    filters={VEDTAKSINSTANSGRUPPE_FILTERS}
    setSelected={setSelected}
  />
);
