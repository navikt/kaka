import { useSearchParams } from 'react-router-dom';
import { ITotalStatisticVurdering } from '../../../types/statistics';
import { QueryParams } from '../../filters/filter-query-params';
import { BehandlingsTidEnum } from '../types';

type FieldName = keyof Pick<
  ITotalStatisticVurdering,
  'kaBehandlingstidDays' | 'totalBehandlingstidDays' | 'vedtaksinstansBehandlingstidDays'
>;

const FIELD_MAP = new Map<BehandlingsTidEnum, FieldName>([
  [BehandlingsTidEnum.TOTAL, 'totalBehandlingstidDays'],
  [BehandlingsTidEnum.KA, 'kaBehandlingstidDays'],
  [BehandlingsTidEnum.VEDTAKSINSTANS, 'vedtaksinstansBehandlingstidDays'],
]);

export const useBehandlingstidParam = (): [FieldName, (behandlingstidType: BehandlingsTidEnum) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setType = (behandlingstidType: BehandlingsTidEnum) => {
    searchParams.set(QueryParams.BEHANDLINGSTID, behandlingstidType.toString());
    setSearchParams(searchParams);
  };

  const fieldId = Number.parseInt(searchParams.get(QueryParams.BEHANDLINGSTID) ?? BehandlingsTidEnum.KA.toString(), 10);

  const field: FieldName = FIELD_MAP.get(fieldId) ?? 'kaBehandlingstidDays';

  return [field, setType];
};
