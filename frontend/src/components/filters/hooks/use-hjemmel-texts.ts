import { useYtelser } from '@app/simple-api-state/use-kodeverk';
import { useMemo } from 'react';
import { useVersionQueryFilter } from './use-query-filter';

export const useHjemmelTexts = (ytelseIds: string[]) => {
  const version = useVersionQueryFilter();
  const { data: ytelser = [] } = useYtelser(version);

  const filtered = useMemo(
    () => (ytelseIds.length === 0 ? ytelser : ytelser.filter(({ id }) => ytelseIds.includes(id))),
    [ytelser, ytelseIds],
  );

  return useMemo(
    () =>
      filtered
        .flatMap(({ lovKildeToRegistreringshjemler }) => lovKildeToRegistreringshjemler)
        .flatMap(({ registreringshjemler, lovkilde }) =>
          registreringshjemler.map(({ id, navn }) => ({
            id,
            label: `${navn} - ${lovkilde.beskrivelse}`,
            tooltip: `${navn} - ${lovkilde.navn}`,
          })),
        ),
    [filtered],
  );
};
