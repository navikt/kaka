import { useMemo } from 'react';
import {
  IKodeverkSimpleValue,
  IKodeverkValue,
  ILovKildeToRegistreringshjemmel,
  IYtelse,
} from '../../../types/kodeverk';
import { FilterType } from '../types';

interface MergedRegistreringshjemmel extends Omit<ILovKildeToRegistreringshjemmel, 'registreringshjemler'> {
  registreringshjemler: FilterType[];
}

export const useMergedLovKildeToRegistreringshjemler = (ytelser: IYtelse[]): MergedRegistreringshjemmel[] =>
  useMemo(() => {
    const lovKilderToRegistreringshjemlerMap = ytelser
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
          }))
          .sort((a, b) => Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10)),
      }))
      .sort((a, b) => Number.parseInt(a.lovkilde.id, 10) - Number.parseInt(b.lovkilde.id, 10));
  }, [ytelser]);
