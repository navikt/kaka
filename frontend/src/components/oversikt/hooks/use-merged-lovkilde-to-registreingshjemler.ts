import { useMemo } from 'react';
import { useGetKodeverkQuery } from '../../../redux-api/kodeverk';
import { IKodeverkSimpleValue, ILovKildeToRegistreringshjemmel } from '../../../types/kodeverk';

export const useMergedLovKildeToRegistreringshjemler = (): ILovKildeToRegistreringshjemmel[] => {
  const { data } = useGetKodeverkQuery();

  return useMemo(() => {
    if (typeof data === 'undefined') {
      return [];
    }

    const lovKildeToRegistreringshjemmelMerged = data.ytelser
      .flatMap(({ lovKildeToRegistreringshjemler }) => lovKildeToRegistreringshjemler)
      .reduce((lovKildeToRegistreringshjemmelAcc, { registreringshjemler, lovkilde }) => {
        const existing = lovKildeToRegistreringshjemmelAcc.get(lovkilde.id);

        if (typeof existing === 'undefined') {
          lovKildeToRegistreringshjemmelAcc.set(lovkilde.id, { registreringshjemler, lovkilde });
        } else {
          const lovkildeHjemlerMerged = existing.registreringshjemler.reduce((hjemler, hjemmel) => {
            const existingHjemmel = hjemler.get(hjemmel.id);

            if (typeof existingHjemmel === 'undefined') {
              hjemler.set(hjemmel.id, hjemmel);
            } else {
              hjemler.set(hjemmel.id, { ...existing, ...hjemmel });
            }

            return hjemler;
          }, new Map<string, IKodeverkSimpleValue>());

          lovKildeToRegistreringshjemmelAcc.set(lovkilde.id, {
            ...existing,
            registreringshjemler: Array.from(lovkildeHjemlerMerged.values()),
          });
        }

        return lovKildeToRegistreringshjemmelAcc;
      }, new Map<string, ILovKildeToRegistreringshjemmel>());

    return Array.from(lovKildeToRegistreringshjemmelMerged.values());
  }, [data]);
};
