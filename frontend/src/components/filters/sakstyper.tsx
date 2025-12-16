import { SakstypeEnum } from '@app/types/sakstype';
import { Filter } from './common/filter';

interface SakstypeFilterProps {
  selected: string[];
  setSelected: (types: string[]) => void;
}

const SAKSTYPER = [
  { id: SakstypeEnum.KLAGE, label: 'Klage' },
  { id: SakstypeEnum.ANKE, label: 'Anke' },
  { id: SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET, label: 'Behandling etter Trygderetten opphevet' },
  { id: SakstypeEnum.OMGJØRINGSKRAV, label: 'Omgjøringskrav' },
];

export const SakstypeFilter = ({ selected, setSelected }: SakstypeFilterProps) => (
  <Filter label="Sakstype" filters={SAKSTYPER} selected={selected} setSelected={setSelected} />
);
