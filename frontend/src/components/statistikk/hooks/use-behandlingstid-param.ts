import type { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../filters/filter-query-params';
import { BehandlingstidEnum, isBehandlingstidEnum } from '../types';

export const useBehandlingstidParam = (): [BehandlingstidEnum, (behandlingstidType: BehandlingstidEnum) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setType = useCallback(
    (behandlingstidType: BehandlingstidEnum) => {
      searchParams.set(QueryParams.BEHANDLINGSTID, behandlingstidType);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const queryParam = searchParams.get(QueryParams.BEHANDLINGSTID);

  const field = isBehandlingstidEnum(queryParam) ? queryParam : BehandlingstidEnum.KA;

  return [field, setType];
};

type FieldName = keyof Pick<
  IFullStatisticVurderingV1,
  'kaBehandlingstidDays' | 'totalBehandlingstidDays' | 'vedtaksinstansBehandlingstidDays'
>;

const FIELD_MAP = new Map<BehandlingstidEnum, FieldName>([
  [BehandlingstidEnum.TOTAL, 'totalBehandlingstidDays'],
  [BehandlingstidEnum.KA, 'kaBehandlingstidDays'],
  [BehandlingstidEnum.VEDTAKSINSTANS, 'vedtaksinstansBehandlingstidDays'],
]);

export const useBehandlingstidField = (): FieldName => {
  const [queryParam] = useBehandlingstidParam();

  return FIELD_MAP.get(queryParam) ?? 'kaBehandlingstidDays';
};
