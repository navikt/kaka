import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import type { IStatisticVurderingV1 } from '@app/types/statistics/v1';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
import { KvalitetsvurderingerV1 } from '../../charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { UtfallGraph } from '../../charts/utfall-graph';
import { useBehandlingstidOverTime } from '../../hooks/use-behandlingstid-over-time';
import { useRelevantStatistics } from '../../hooks/use-relevant-statistics';
import { Gjennomsnittstid } from '../../key-stats/average-time';
import { Finished } from '../../key-stats/finished';
import { Omgjort } from '../../key-stats/omgjort';
import { Processed } from '../../key-stats/processed';
import { ToggleTotalOrKA } from '../../toggle-ka-total';

interface Props {
  stats: IStatisticVurderingV1[];
  isLoading: boolean;
}

export const ContentV1 = ({ stats, isLoading }: Props) => {
  const relevantStats = useRelevantStatistics(stats);
  const behandlingstidOverTime = useBehandlingstidOverTime(relevantStats);

  return (
    <ContentArea>
      <LoadingOverlay isLoading={isLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={stats} />
          <TotalProcessed length={relevantStats.length} />
          <Omgjort stats={relevantStats} label="Omgjort av klageinstansen" />
          <Gjennomsnittstid stats={relevantStats} />
          <Processed weeks={12} stats={relevantStats} />
          <Processed weeks={15} stats={relevantStats} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT} placement="bottom">
          Omgjøringsprosent
        </CardTitleWithExplainer>
        <Omgjoeringsprosent stats={[{ label: 'Totalt', data: stats }]} />
      </DynamicCard>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitle>Kvalitetsvurderinger</CardTitle>
        <TypeWarning />
        <KvalitetsvurderingerV1 stats={relevantStats} />
      </DynamicCard>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Utfall</CardTitle>
        <UtfallGraph stats={stats} />
      </DynamicCard>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Hjemler</CardTitle>
        <Hjemler stats={relevantStats} />
      </DynamicCard>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitle>Behandlingstid</CardTitle>
        <ToggleTotalOrKA />
        <BehandlingstidHistogram stats={relevantStats} />
      </DynamicCard>

      <BehandlingstidOverTime stats={behandlingstidOverTime} />
    </ContentArea>
  );
};
