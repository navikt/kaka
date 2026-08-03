import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IStatisticVurderingV1 } from '@app/types/statistics/v1';
import { LoadingOverlay } from '../../../loader/overlay';
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
import { Card, ChartsWrapper, StatisticsWrapper } from '../../wrappers/wrappers';

interface Props {
  stats: IStatisticVurderingV1[];
  isLoading: boolean;
}

export const ContentV1 = ({ stats, isLoading }: Props) => {
  const relevantStats = useRelevantStatistics(stats, KvalitetsvurderingVersion.V1);
  const behandlingstidOverTime = useBehandlingstidOverTime(relevantStats);

  return (
    <StatisticsWrapper>
      <LoadingOverlay isLoading={isLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={stats} version={KvalitetsvurderingVersion.V1} />
          <TotalProcessed length={relevantStats.length} version={KvalitetsvurderingVersion.V1} />
          <Omgjort version={KvalitetsvurderingVersion.V1} stats={relevantStats} label="Omgjort av klageinstansen" />
          <Gjennomsnittstid stats={relevantStats} />
          <Processed weeks={12} stats={relevantStats} />
          <Processed weeks={15} stats={relevantStats} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card rowSpan={1} colSpan={2}>
          <Omgjoeringsprosent
            stats={[{ label: 'Totalt', data: relevantStats }]}
            version={KvalitetsvurderingVersion.V1}
            title="Omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V1_V2}
          />
        </Card>

        <KvalitetsvurderingerV1 stats={relevantStats} />
        <UtfallGraph stats={stats} title="Utfall" />
        <Hjemler stats={relevantStats} title="Hjemler" />
        <BehandlingstidHistogram stats={relevantStats} title="Behandlingstid" headerContent={<ToggleTotalOrKA />} />
        <BehandlingstidOverTime stats={behandlingstidOverTime} title="Behandlingstid" />
      </ChartsWrapper>
    </StatisticsWrapper>
  );
};
