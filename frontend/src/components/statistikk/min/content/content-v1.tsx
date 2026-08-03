import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
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
  mine: IFullStatisticVurderingV1[];
  rest: IFullStatisticVurderingV1[];
  isLoading: boolean;
}

export const ContentV1 = ({ mine, rest, isLoading }: Props) => {
  const relevantMine = useRelevantStatistics(mine, KvalitetsvurderingVersion.V1);
  const relevantRest = useRelevantStatistics(rest, KvalitetsvurderingVersion.V1);

  const behandlingstidOverTime = useBehandlingstidOverTime(relevantMine);

  const datasets = [
    { label: 'Meg', data: relevantMine },
    { label: 'Andre saksbehandlere i min enhet', data: relevantRest },
    { label: 'Alle saksbehandlere i min enhet', data: [...relevantMine, ...relevantRest] },
  ];

  return (
    <StatisticsWrapper>
      <LoadingOverlay isLoading={isLoading} />
      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={mine} version={KvalitetsvurderingVersion.V1} />
          <TotalProcessed length={relevantMine.length} version={KvalitetsvurderingVersion.V1} />
          <Omgjort version={KvalitetsvurderingVersion.V1} stats={relevantMine} label="Omgjort av meg" />
          <Gjennomsnittstid stats={relevantMine} />
          <Processed weeks={12} stats={relevantMine} />
          <Processed weeks={15} stats={relevantMine} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card rowSpan={2} colSpan={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V1}
            title="Min omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V1_V2}
          />
        </Card>

        <KvalitetsvurderingerV1 stats={relevantMine} />
        <UtfallGraph stats={mine} title="Utfall" />
        <Hjemler stats={relevantMine} title="Hjemler" />
        <BehandlingstidHistogram stats={relevantMine} title="Behandlingstid" headerContent={<ToggleTotalOrKA />} />
        <BehandlingstidOverTime stats={behandlingstidOverTime} title="Behandlingstid" />
      </ChartsWrapper>
    </StatisticsWrapper>
  );
};
