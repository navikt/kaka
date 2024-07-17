import { Filter } from '../../filters/common/filter';
import { FilterType } from '../../filters/types';

export enum Vedtaksinstansgruppe {
  AKERSHUS = 0,
  OSLO = 1,
  VESTLAND = 2,
  ROGALAND = 3,
  TRØNDELAG = 4,
  INNLANDET = 5,
  AGDER = 6,
  ØSTFOLD = 7,
  MØRE_OG_ROMSDAL = 8,
  BUSKERUD = 9,
  VESTFOLD = 10,
  NORDLAND = 11,
  TELEMARK = 12,
  TROMS = 13,
  FINNMARK = 14,
  NAV_ØKONOMI_STØNAD = 15,
  NAV_ARBEID_OG_YTELSER = 16,
  NAV_KONTROLL_FORVALTNING = 17,
  NAV_HJELPEMIDDELSENTRAL = 18,
  NAV_FAMILIE_OG_PENSJONSYTELSER = 19,
  UNKNOWN = 999,
}

export const VEDTAKSINSTANSGRUPPE_FILTERS: FilterType<Vedtaksinstansgruppe>[] = [
  // Fylker
  { id: Vedtaksinstansgruppe.AGDER, label: 'Agder' },
  { id: Vedtaksinstansgruppe.AKERSHUS, label: 'Akershus' },
  { id: Vedtaksinstansgruppe.BUSKERUD, label: 'Buskerud' },
  { id: Vedtaksinstansgruppe.FINNMARK, label: 'Finnmark' },
  { id: Vedtaksinstansgruppe.INNLANDET, label: 'Innlandet' },
  { id: Vedtaksinstansgruppe.MØRE_OG_ROMSDAL, label: 'Møre og Romsdal' },
  { id: Vedtaksinstansgruppe.NORDLAND, label: 'Nordland' },
  { id: Vedtaksinstansgruppe.OSLO, label: 'Oslo' },
  { id: Vedtaksinstansgruppe.ROGALAND, label: 'Rogaland' },
  { id: Vedtaksinstansgruppe.TELEMARK, label: 'Telemark' },
  { id: Vedtaksinstansgruppe.TROMS, label: 'Troms' },
  { id: Vedtaksinstansgruppe.TRØNDELAG, label: 'Trøndelag' },
  { id: Vedtaksinstansgruppe.VESTFOLD, label: 'Vestfold' },
  { id: Vedtaksinstansgruppe.VESTLAND, label: 'Vestland' },
  { id: Vedtaksinstansgruppe.ØSTFOLD, label: 'Østfold' },

  // Vedtaksinstansgrupper
  { id: Vedtaksinstansgruppe.NAV_ARBEID_OG_YTELSER, label: 'NAV Arbeid og ytelser' },
  { id: Vedtaksinstansgruppe.NAV_FAMILIE_OG_PENSJONSYTELSER, label: 'NAV Familie- og pensjonsytelser' },
  { id: Vedtaksinstansgruppe.NAV_HJELPEMIDDELSENTRAL, label: 'NAV Hjelpemiddelsentral' },
  { id: Vedtaksinstansgruppe.NAV_KONTROLL_FORVALTNING, label: 'NAV Kontroll Forvaltning' },
  { id: Vedtaksinstansgruppe.NAV_ØKONOMI_STØNAD, label: 'NAV Økonomi Stønad' },

  // Ukjent
  { id: Vedtaksinstansgruppe.UNKNOWN, label: 'Ukjent' },
];

const VEDTAKSINSTANSGRUPPE_VALUES = Object.values(Vedtaksinstansgruppe);
export const isVedtaksinstansgruppe = (vedtaksinstansgruppe: number): vedtaksinstansgruppe is Vedtaksinstansgruppe =>
  VEDTAKSINSTANSGRUPPE_VALUES.some((value) => value === vedtaksinstansgruppe);

interface Props {
  selected: Vedtaksinstansgruppe[];
  setSelected: (vedtaksinstansgrupper: string[]) => void;
}

export const VedtaksinstansgruppeFilter = ({ selected, setSelected }: Props) => (
  <Filter<Vedtaksinstansgruppe>
    label="Vedtaksinstansgruppe"
    selected={selected}
    filters={VEDTAKSINSTANSGRUPPE_FILTERS}
    setSelected={setSelected}
  />
);
