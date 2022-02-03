import { useMemo } from 'react';
import { useGetKodeverkQuery } from '../../../redux-api/kodeverk';

export const useHjemmelTexts = (ytelseIds: string[]) => {
  const { data } = useGetKodeverkQuery();

  const ytelser = useMemo(() => data?.ytelser ?? [], [data]);

  const filtered = useMemo(
    () => (ytelseIds.length === 0 ? ytelser : ytelser.filter(({ id }) => ytelseIds.includes(id))),
    [ytelser, ytelseIds]
  );

  return useMemo(
    () =>
      filtered
        .flatMap(({ lovKildeToRegistreringshjemler }) => lovKildeToRegistreringshjemler)
        .flatMap(({ registreringshjemler, lovkilde }) =>
          registreringshjemler.map(({ id, navn }) => ({
            id,
            label: `${lovkilde.beskrivelse} - ${navn}`,
            tooltip: `${lovkilde.navn} - ${navn}`,
          }))
        ),
    [filtered]
  );
};
