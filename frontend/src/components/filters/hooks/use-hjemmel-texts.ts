import { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';

export const useHjemmelTexts = (ytelseIds: string[]) => {
  const ytelser = useKodeverkValueDefault('ytelser');

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
