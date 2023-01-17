import { useMemo } from 'react';
import { useYtelser } from '../../../simple-api-state/use-kodeverk';
import { useVersionQueryFilter } from './use-query-filter';

export const useHjemmelTexts = (ytelseIds: string[]) => {
  const version = useVersionQueryFilter();
  const { data: ytelser = [] } = useYtelser(version);

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
