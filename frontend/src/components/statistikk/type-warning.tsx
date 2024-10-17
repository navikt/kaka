import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { useSakstyper } from '@app/simple-api-state/use-kodeverk';
import { SakstypeEnum } from '@app/types/sakstype';
import { Alert } from '@navikt/ds-react';

const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const useIdToName = () => {
  const { data: sakstyper = [] } = useSakstyper();

  return (sakstype: SakstypeEnum) => uncapitalize(sakstyper.find(({ id }) => id === sakstype)?.navn ?? sakstype);
};

export const TypeWarning = () => {
  const filteredSakstyper = useSakstypeFilter();
  const sakstypeToName = useIdToName();

  const hasKvalitetsvurdering = filteredSakstyper.filter(
    (type) => type === SakstypeEnum.KLAGE || type === SakstypeEnum.ANKE,
  );

  const noKvalitetsvurdering = filteredSakstyper.filter((type) => type === SakstypeEnum.BEHANDLING_ETTER_TR_OPPHEVET); // TODO: Add omgjøringskrav here

  if (hasKvalitetsvurdering.length === 0 || noKvalitetsvurdering.length === 0) {
    return null;
  }

  const kvalitetsvurderingNames = hasKvalitetsvurdering.map(sakstypeToName).join(' og ');
  const noKvalitetsvurderingNames = noKvalitetsvurdering.map(sakstypeToName).join(' og ');

  return (
    <Alert variant="warning" size="small">
      Du har valgt å kombinere statistikk for <b>{kvalitetsvurderingNames}</b> sammen med{' '}
      <b>{noKvalitetsvurderingNames}</b>. {capitalize(kvalitetsvurderingNames)} <i>har</i> kvalitetsvurderinger, mens{' '}
      {noKvalitetsvurderingNames} <i>ikke</i> har det. Derfor vil kun {kvalitetsvurderingNames} bli tatt med i
      kvalitetsvurderingstatistikken.
    </Alert>
  );
};
