import { useMemo } from 'react';
import { IKodeverkSimpleValue, ISakstyperToUtfall } from '@app/types/kodeverk';
import { SakstypeEnum } from '@app/types/sakstype';
import { UtfallEnum } from '@app/types/utfall';
import { SimpleApiState, useSimpleApiState } from './simple-api-state';
import { API_PREFIX } from './use-kodeverk';

const KLAGE_ORDER = [
  UtfallEnum.STADFESTELSE,
  UtfallEnum.MEDHOLD,
  UtfallEnum.DELVIS_MEDHOLD,
  UtfallEnum.OPPHEVET,
  UtfallEnum.AVVIST,
  UtfallEnum.TRUKKET,
  UtfallEnum.RETUR,
  UtfallEnum.UGUNST,
];

const ANKE_ORDER = [
  UtfallEnum.INNSTILLING_STADFESTELSE,
  UtfallEnum.MEDHOLD,
  UtfallEnum.DELVIS_MEDHOLD,
  UtfallEnum.OPPHEVET,
  UtfallEnum.INNSTILLING_AVVIST,
  UtfallEnum.TRUKKET,
];

const KLAGE_AND_ANKE_ORDER = [
  UtfallEnum.STADFESTELSE,
  UtfallEnum.INNSTILLING_STADFESTELSE,
  UtfallEnum.MEDHOLD,
  UtfallEnum.DELVIS_MEDHOLD,
  UtfallEnum.OPPHEVET,
  UtfallEnum.AVVIST,
  UtfallEnum.INNSTILLING_AVVIST,
  UtfallEnum.TRUKKET,
  UtfallEnum.RETUR,
  UtfallEnum.UGUNST,
];

const sortUtfallKlage = (a: IKodeverkSimpleValue<UtfallEnum>, b: IKodeverkSimpleValue<UtfallEnum>) =>
  KLAGE_ORDER.indexOf(a.id) - KLAGE_ORDER.indexOf(b.id);

const sortUtfallAnke = (a: IKodeverkSimpleValue<UtfallEnum>, b: IKodeverkSimpleValue<UtfallEnum>) =>
  ANKE_ORDER.indexOf(a.id) - ANKE_ORDER.indexOf(b.id);

const sortUtfallKlageAndAnke = (a: IKodeverkSimpleValue<UtfallEnum>, b: IKodeverkSimpleValue<UtfallEnum>) =>
  KLAGE_AND_ANKE_ORDER.indexOf(a.id) - KLAGE_AND_ANKE_ORDER.indexOf(b.id);

const UTFALL_VALUES = Object.values(UtfallEnum).sort(
  (a, b) => KLAGE_AND_ANKE_ORDER.indexOf(a) - KLAGE_AND_ANKE_ORDER.indexOf(b)
);

export const UTFALL_VALUES_FOR_STATS = UTFALL_VALUES.filter(
  (v) =>
    v !== UtfallEnum.RETUR &&
    v !== UtfallEnum.TRUKKET &&
    v !== UtfallEnum.UGUNST &&
    v !== UtfallEnum.HEVET &&
    v !== UtfallEnum.HENVIST
);

const isUtfall = (value: string): value is UtfallEnum => UTFALL_VALUES.some((v) => v === value);

const filterAnkeITrygderetten = ({ id }: IKodeverkSimpleValue<UtfallEnum>) => isUtfall(id);

const utfall = new SimpleApiState<IKodeverkSimpleValue<UtfallEnum>[]>(`${API_PREFIX}/utfall`);
const sakstyperToUtfall = new SimpleApiState<ISakstyperToUtfall[]>(`${API_PREFIX}/sakstypertoutfall`);

const useSakstyperToUtfall = () => {
  const { data = [], ...rest } = useSimpleApiState(sakstyperToUtfall);

  const sorted = useMemo(
    () =>
      data.map(({ id, utfall: u, navn }) => {
        if (id === SakstypeEnum.KLAGE) {
          return { id, utfall: u.sort(sortUtfallKlage), navn };
        }

        if (id === SakstypeEnum.ANKE) {
          return { id, utfall: u.sort(sortUtfallAnke), navn };
        }

        return { id, utfall: u.filter(filterAnkeITrygderetten), navn };
      }),
    [data]
  );

  return { data: sorted, ...rest };
};

export const useUtfall = () => useSimpleApiState(utfall);

export const useSortedUtfall = () => {
  const { data = [], ...rest } = useUtfall();

  const sorted = useMemo(() => data.filter(filterAnkeITrygderetten).sort(sortUtfallKlageAndAnke), [data]);

  return { data: sorted, ...rest };
};

export const useUtfallForStats = () => {
  const { data = [], ...rest } = useUtfall();

  const filtered = useMemo(
    () =>
      data.filter(
        ({ id }) =>
          id !== UtfallEnum.RETUR &&
          id !== UtfallEnum.TRUKKET &&
          id !== UtfallEnum.UGUNST &&
          id !== UtfallEnum.HEVET &&
          id !== UtfallEnum.HENVIST
      ),
    [data]
  );

  return { data: filtered, ...rest };
};

export const useUtfallFromSakstype = (type?: SakstypeEnum): [IKodeverkSimpleValue<UtfallEnum>[], boolean] => {
  const { data } = useSakstyperToUtfall();

  return useMemo(() => {
    if (typeof data === 'undefined' || typeof type === 'undefined') {
      return [[], true];
    }

    const u = data.find(({ id }) => id === type)?.utfall ?? [];

    return [u, false];
  }, [data, type]);
};
