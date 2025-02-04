import type { IKodeverkSimpleValue, ISakstyperToUtfall } from '@app/types/kodeverk';
import { SakstypeEnum } from '@app/types/sakstype';
import { UtfallEnum } from '@app/types/utfall';
import { useMemo } from 'react';
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

const ALL_ORDER = [
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
  UtfallEnum.MEDHOLD_ETTER_FORVALTNINGSLOVEN_35,
  UtfallEnum.BESLUTNING_OM_IKKE_Å_OMGJØRE,
  UtfallEnum.STADFESTET_MED_EN_ANNEN_BEGRUNNELSE,
];

const sortUtfallKlage = (a: IKodeverkSimpleValue<UtfallEnum>, b: IKodeverkSimpleValue<UtfallEnum>) =>
  KLAGE_ORDER.indexOf(a.id) - KLAGE_ORDER.indexOf(b.id);

const sortUtfallAnke = (a: IKodeverkSimpleValue<UtfallEnum>, b: IKodeverkSimpleValue<UtfallEnum>) =>
  ANKE_ORDER.indexOf(a.id) - ANKE_ORDER.indexOf(b.id);

const sortUtfallAll = (a: IKodeverkSimpleValue<UtfallEnum>, b: IKodeverkSimpleValue<UtfallEnum>) =>
  ALL_ORDER.indexOf(a.id) - ALL_ORDER.indexOf(b.id);

const UTFALL_VALUES = Object.values(UtfallEnum).sort((a, b) => ALL_ORDER.indexOf(a) - ALL_ORDER.indexOf(b));

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
    [data],
  );

  return { data: sorted, ...rest };
};

export const useUtfall = () => useSimpleApiState(utfall);

export const useSortedUtfall = () => {
  const { data = [], ...rest } = useUtfall();

  const sorted = useMemo(() => data.filter(filterAnkeITrygderetten).sort(sortUtfallAll), [data]);

  return { data: sorted, ...rest };
};

export const useUtfallForStats = () => {
  const { data = [], ...rest } = useUtfall();

  const filtered = useMemo(
    () =>
      data.filter(
        ({ id }) =>
          id !== UtfallEnum.RETUR && id !== UtfallEnum.TRUKKET && id !== UtfallEnum.HEVET && id !== UtfallEnum.HENVIST,
      ),
    [data],
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
