import { useSearchParams } from 'react-router-dom';
import { IStatisticVurdering } from '../../../types/statistics';
import { QueryParams } from '../types';

enum BehandlingsTidEnum {
  TOTAL,
  KA,
}

type FieldName = keyof Pick<IStatisticVurdering, 'behandlingstidDays' | 'totalBehandlingstidDays'>;

const FIELD_MAP = new Map<BehandlingsTidEnum, FieldName>([
  [BehandlingsTidEnum.TOTAL, 'totalBehandlingstidDays'],
  [BehandlingsTidEnum.KA, 'behandlingstidDays'],
]);

export const useBehandlingstidParam = (): [FieldName, (behandlingstidType: BehandlingsTidEnum) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setType = (behandlingstidType: BehandlingsTidEnum) => {
    searchParams.set(QueryParams.BEHANDLINGSTID, behandlingstidType.toString());
    setSearchParams(searchParams);
  };

  const fieldId = Number.parseInt(searchParams.get(QueryParams.BEHANDLINGSTID) ?? BehandlingsTidEnum.KA.toString(), 10);

  const field: FieldName = FIELD_MAP.get(fieldId) ?? 'behandlingstidDays';

  return [field, setType];
};