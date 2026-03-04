import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IFullStatisticVurderingV2 } from '@app/types/statistics/v2';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { UtfallGraph } from '../../charts/utfall-graph';
import { KvalitetsvurderingerV2 } from '../../charts/v2/kvalitetsvurderinger/kvalitetsvurderinger';
import { useBehandlingstidOverTime } from '../../hooks/use-behandlingstid-over-time';
import { useRelevantStatistics } from '../../hooks/use-relevant-statistics';
import { Gjennomsnittstid } from '../../key-stats/average-time';
import { Finished } from '../../key-stats/finished';
import { Omgjort } from '../../key-stats/omgjort';
import { Processed } from '../../key-stats/processed';
import { ToggleTotalOrKA } from '../../toggle-ka-total';

interface Props {
  mine: IFullStatisticVurderingV2[];
  rest: IFullStatisticVurderingV2[];
  isLoading: boolean;
}

export const ContentV2 = ({ mine, rest, isLoading }: Props) => {
  const relevantMine = useRelevantStatistics(mine, KvalitetsvurderingVersion.V2);
  const relevantRest = useRelevantStatistics(rest, KvalitetsvurderingVersion.V2);

  const behandlingstidOverTime = useBehandlingstidOverTime(relevantMine);

  const datasets = [
    { label: 'Meg', data: relevantMine },
    { label: 'Andre saksbehandlere i min enhet', data: relevantRest },
    { label: 'Alle saksbehandlere i min enhet', data: [...relevantMine, ...relevantRest] },
  ];

  return (
    <ContentArea>
      <LoadingOverlay isLoading={isLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={mine} version={KvalitetsvurderingVersion.V2} />
          <TotalProcessed length={relevantMine.length} version={KvalitetsvurderingVersion.V2} />
          <Omgjort version={KvalitetsvurderingVersion.V2} stats={relevantMine} label="Omgjort av meg" />
          <Gjennomsnittstid stats={relevantMine} />
          <Processed weeks={12} stats={relevantMine} />
          <Processed weeks={15} stats={relevantMine} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT_V1_V2} placement="bottom">
          Min omgjøringsprosent
        </CardTitleWithExplainer>
        <Omgjoeringsprosent stats={datasets} version={KvalitetsvurderingVersion.V2} />
      </DynamicCard>

      <TypeWarning />
      <KvalitetsvurderingerV2 datasets={datasets} />

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Utfall</CardTitle>
        <UtfallGraph stats={mine} />
      </DynamicCard>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Hjemler</CardTitle>
        <Hjemler stats={relevantMine} />
      </DynamicCard>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitle>Behandlingstid</CardTitle>
        <ToggleTotalOrKA />
        <BehandlingstidHistogram stats={relevantMine} />
      </DynamicCard>

      <BehandlingstidOverTime stats={behandlingstidOverTime} />
    </ContentArea>
  );
};
