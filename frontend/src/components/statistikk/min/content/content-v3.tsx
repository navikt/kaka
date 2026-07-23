import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { KvalitetsvurderingerV3 } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/kvalitetsvurderinger';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V3 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IFullStatisticVurderingV3 } from '@app/types/statistics/v3';
import { LoadingOverlay } from '../../../loader/overlay';
import { Card } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
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
  mine: IFullStatisticVurderingV3[];
  rest: IFullStatisticVurderingV3[];
  isLoading: boolean;
}

export const ContentV3 = ({ mine, rest, isLoading }: Props) => {
  const relevantMine = useRelevantStatistics(mine, KvalitetsvurderingVersion.V3);
  const relevantRest = useRelevantStatistics(rest, KvalitetsvurderingVersion.V3);

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
          <Finished stats={mine} version={KvalitetsvurderingVersion.V3} />
          <TotalProcessed length={relevantMine.length} version={KvalitetsvurderingVersion.V3} />
          <Omgjort version={KvalitetsvurderingVersion.V3} stats={relevantMine} label="Omgjort av meg" />
          <Gjennomsnittstid stats={relevantMine} />
          <Processed weeks={12} stats={relevantMine} />
          <Processed weeks={15} stats={relevantMine} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card span={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V3}
            title="Min omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V3}
          />
        </Card>

        <TypeWarning />
        <KvalitetsvurderingerV3 datasets={datasets} />

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
