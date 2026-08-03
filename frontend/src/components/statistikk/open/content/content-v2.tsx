import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IStatisticVurderingV2 } from '@app/types/statistics/v2';
import { LoadingOverlay } from '../../../loader/overlay';
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
import { Card, ChartsWrapper, StatisticsWrapper } from '../../wrappers/wrappers';

interface Props {
  stats: IStatisticVurderingV2[];
  isLoading: boolean;
}

export const ContentV2 = ({ stats, isLoading }: Props) => {
  const relevantStats = useRelevantStatistics(stats, KvalitetsvurderingVersion.V2);
  const behandlingstidOverTime = useBehandlingstidOverTime(relevantStats);

  const datasets = [{ label: 'Totalt', data: relevantStats }];

  return (
    <StatisticsWrapper>
      <LoadingOverlay isLoading={isLoading} />
      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={stats} version={KvalitetsvurderingVersion.V2} />
          <TotalProcessed length={relevantStats.length} version={KvalitetsvurderingVersion.V2} />
          <Omgjort version={KvalitetsvurderingVersion.V2} stats={relevantStats} label="Omgjort av klageinstansen" />
          <Gjennomsnittstid stats={relevantStats} />
          <Processed weeks={12} stats={relevantStats} />
          <Processed weeks={15} stats={relevantStats} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card rowSpan={1} colSpan={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V2}
            title="Omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V1_V2}
          />
        </Card>

        <TypeWarning />
        <KvalitetsvurderingerV2 datasets={datasets} />
        <UtfallGraph stats={stats} title="Utfall" />
        <Hjemler stats={relevantStats} title="Hjemler" />
        <BehandlingstidHistogram stats={relevantStats} title="Behandlingstid" headerContent={<ToggleTotalOrKA />} />
        <BehandlingstidOverTime stats={behandlingstidOverTime} title="Behandlingstid" />
      </ChartsWrapper>
    </StatisticsWrapper>
  );
};
