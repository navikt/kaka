import { LoadingOverlay } from '@app/components/loader/overlay';
import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V3 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IFullStatisticVurderingV3 } from '@app/types/statistics/v3';
import { Card } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { UtfallGraph } from '../../charts/utfall-graph';
import { KvalitetsvurderingerV3 } from '../../charts/v3/kvalitetsvurderinger/kvalitetsvurderinger';
import { useBehandlingstidOverTime } from '../../hooks/use-behandlingstid-over-time';
import { useRelevantStatistics } from '../../hooks/use-relevant-statistics';
import { Gjennomsnittstid } from '../../key-stats/average-time';
import { Finished } from '../../key-stats/finished';
import { Omgjort } from '../../key-stats/omgjort';
import { Processed } from '../../key-stats/processed';
import { ToggleTotalOrKA } from '../../toggle-ka-total';

interface Props {
  rest: IFullStatisticVurderingV3[];
  isLoading: boolean;
}

export const ContentV3 = ({ rest, isLoading }: Props) => {
  const relevantRest = useRelevantStatistics(rest, KvalitetsvurderingVersion.V3);
  const behandlingstidOverTime = useBehandlingstidOverTime(relevantRest);

  const datasets = [{ label: 'Totalt', data: relevantRest }];

  return (
    <div className="lg:overflow-auto">
      <LoadingOverlay isLoading={isLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={rest} version={KvalitetsvurderingVersion.V3} />
          <TotalProcessed length={relevantRest.length} version={KvalitetsvurderingVersion.V3} />
          <Omgjort version={KvalitetsvurderingVersion.V3} stats={relevantRest} label="Omgjort av klageinstansen" />
          <Gjennomsnittstid stats={relevantRest} />
          <Processed weeks={12} stats={relevantRest} />
          <Processed weeks={15} stats={relevantRest} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card span={1}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V3}
            title="Omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V3}
          />
        </Card>

        <TypeWarning />
        <KvalitetsvurderingerV3 datasets={datasets} />

        <Card span={2}>
          <UtfallGraph stats={rest} title="Utfall" />
        </Card>

        <Card span={3}>
          <Hjemler stats={relevantRest} title="Hjemler" />
        </Card>

        <Card span={3}>
          <BehandlingstidHistogram stats={relevantRest} title="Behandlingstid" headerContent={<ToggleTotalOrKA />} />
        </Card>

        <Card span={2}>
          <BehandlingstidOverTime stats={behandlingstidOverTime} title="Behandlingstid" />
        </Card>
      </ChartsWrapper>
    </div>
  );
};
