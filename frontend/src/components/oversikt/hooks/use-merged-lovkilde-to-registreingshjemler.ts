import { useMemo } from 'react';
import { useGetKodeverkQuery } from '../../../redux-api/kodeverk';
import { IKodeverkSimpleValue, IKodeverkValue, ILovKildeToRegistreringshjemmel } from '../../../types/kodeverk';
import { FilterType, StatisticsProps } from '../types';

interface ILovKildeToRegistreringshjemmelWithCount
  extends Omit<ILovKildeToRegistreringshjemmel, 'registreringshjemler'> {
  registreringshjemler: FilterType[];
}

export const useMergedLovKildeToRegistreringshjemler = (
  stats: StatisticsProps['stats']
): ILovKildeToRegistreringshjemmelWithCount[] => {
  const { data } = useGetKodeverkQuery();

  return useMemo(() => {
    if (typeof data === 'undefined') {
      return [];
    }

    const lovKilderToRegistreringshjemlerMap = data.ytelser
      .flatMap(({ lovKildeToRegistreringshjemler }) => lovKildeToRegistreringshjemler)
      .reduce(
        (lovkildeToRegistreringshjemler, { lovkilde, registreringshjemler }) => {
          const existingLovkildeToRegistreringshjemmel = lovkildeToRegistreringshjemler.get(lovkilde.id);

          const registreringshjemmelMap = new Map<string, IKodeverkSimpleValue>();

          if (typeof existingLovkildeToRegistreringshjemmel === 'undefined') {
            registreringshjemler.forEach((registreringshjemmel) => {
              registreringshjemmelMap.set(registreringshjemmel.id, registreringshjemmel);
            });

            lovkildeToRegistreringshjemler.set(lovkilde.id, {
              lovkilde,
              registreringshjemmelMap,
            });
          } else {
            registreringshjemler.forEach((registreringshjemmel) => {
              existingLovkildeToRegistreringshjemmel.registreringshjemmelMap.set(
                registreringshjemmel.id,
                registreringshjemmel
              );
            });
          }

          return lovkildeToRegistreringshjemler;
        },
        new Map<
          string,
          {
            lovkilde: IKodeverkValue;
            registreringshjemmelMap: Map<string, IKodeverkSimpleValue>;
          }
        >()
      );

    return Array.from(lovKilderToRegistreringshjemlerMap.values())
      .map(({ lovkilde, registreringshjemmelMap }) => ({
        lovkilde,
        registreringshjemler: Array.from(registreringshjemmelMap.values())
          .map(({ id, navn }) => ({
            id,
            label: navn,
            count: stats.filter(({ hjemmelIdList }) => hjemmelIdList.includes(id)).length,
          }))
          .sort((a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10)),
      }))
      .sort((a, b) => Number.parseInt(a.lovkilde.id, 10) - Number.parseInt(b.lovkilde.id, 10));
  }, [data, stats]);
};
