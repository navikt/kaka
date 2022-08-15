import React from 'react';
import { Filter } from '../../filters/common/filter';
import { FilterType } from '../../filters/types';

export const VEDTAKSINSTANSGRUPPER: FilterType[] = [
  // Eksisterende fylker per 2022
  { id: '03', label: 'Oslo' },
  { id: '11', label: 'Rogaland' },
  { id: '15', label: 'Møre og Romsdal' },
  { id: '18', label: 'Nordland' },
  // { id: '30', label: 'Viken' }, // Ingen enheter
  // { id: '34', label: 'Innlandet' }, // Ingen enheter
  // { id: '38', label: 'Vestfold og Telemark' }, // Ingen enheter
  // { id: '42', label: 'Agder' }, // Ingen enheter
  // { id: '46', label: 'Vestland' }, // Ingen enheter
  // { id: '50', label: 'Trøndelag' }, // Ingen enheter
  // { id: '54', label: 'Troms og Finnmark' }, // Ingen enheter

  // "Feil" fylker
  { id: '53', label: 'Vestfold og Telemark' },
  { id: '57', label: 'Trøndelag' },

  // Gamle fylker
  { id: '01', label: 'Østfold' },
  { id: '02', label: 'Akershus' },
  { id: '04', label: 'Hedmark' },
  { id: '05', label: 'Oppland' },
  { id: '06', label: 'Buskerud' },
  { id: '07', label: 'Vestfold' },
  { id: '08', label: 'Telemark' },
  { id: '09', label: 'Aust-Agder' },
  { id: '10', label: 'Vest-Agder' },
  { id: '12', label: 'Hordaland' },
  // { id: '13', label: 'Bergen' }, // Ingen enheter, avviklet i 1971.
  { id: '14', label: 'Sogn og Fjordane' },
  { id: '16', label: 'Sør-Trøndelag' },
  { id: '17', label: 'Nord-Trøndelag' },
  { id: '19', label: 'Troms' },
  { id: '20', label: 'Finnmark' },

  // Vedtaksinstansgrupper
  { id: '41', label: 'NAV Økonomi Stønad' },
  { id: '44', label: 'NAV Arbeid og ytelser' },
  { id: '45', label: 'NAV Kontroll Forvaltning' },
  { id: '47', label: 'NAV Hjelpemiddelsentral' },
  { id: '48', label: 'NAV Familie- og pensjonsytelser' },
].sort((a, b) => a.label.localeCompare(b.label));

interface Props {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const VedtaksinstansgruppeFilter = ({ selected, setSelected }: Props) => (
  <Filter label="Vedtaksinstansgruppe" selected={selected} filters={VEDTAKSINSTANSGRUPPER} setSelected={setSelected} />
);
