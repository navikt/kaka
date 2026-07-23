import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { LoadingOverlay } from '../../../loader/overlay';
import { Card } from '../../card/card';
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
    <div className="lg:overflow-auto">
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
        <Card span={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V1}
            title="Min omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V1_V2}
          />
        </Card>

        <Card span={4}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <TypeWarning />
          <KvalitetsvurderingerV1 stats={relevantMine} />
        </Card>

        <Card span={2}>
          <UtfallGraph stats={mine} title="Utfall" />
        </Card>

        <Card span={3}>
          <Hjemler stats={relevantMine} title="Hjemler" />
        </Card>

        <Card span={3}>
          <BehandlingstidHistogram stats={relevantMine} title="Behandlingstid" headerContent={<ToggleTotalOrKA />} />
        </Card>

        <Card span={2}>
          <BehandlingstidOverTime stats={behandlingstidOverTime} title="Behandlingstid" />
        </Card>
      </ChartsWrapper>
    </div>
  );
};
