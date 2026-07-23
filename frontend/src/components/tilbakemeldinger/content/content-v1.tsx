import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IStatisticVurderingV1 } from '@app/types/statistics/v1';
import { VurderingerTable } from '../../kvalitetsvurderinger/table';
import { LoadingOverlay } from '../../loader/overlay';
import { Card } from '../../statistikk/card/card';
import { Hjemler } from '../../statistikk/charts/hjemler';
import { KvalitetsvurderingerV1 } from '../../statistikk/charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { Omgjoeringsprosent } from '../../statistikk/charts/omgjoeringsprosent';
import { UtfallGraph } from '../../statistikk/charts/utfall-graph';
import { useRelevantStatistics } from '../../statistikk/hooks/use-relevant-statistics';
import { Finished } from '../../statistikk/key-stats/finished';
import { Omgjort } from '../../statistikk/key-stats/omgjort';
import type { TilbakemeldingerCommonProps } from '../types';

interface Props extends TilbakemeldingerCommonProps {
  mine: IStatisticVurderingV1[];
  rest: IStatisticVurderingV1[];
}

export const ContentV1 = ({ mine, rest, statsIsLoading, saksdata, saksdataIsLoading }: Props) => {
  const relevantMine = useRelevantStatistics(mine, KvalitetsvurderingVersion.V1);
  const relevantRest = useRelevantStatistics(rest, KvalitetsvurderingVersion.V1);

  const datasets = [
    { label: 'Vår enhet', data: relevantMine },
    { label: 'Andres enheter', data: relevantRest },
    { label: 'Alle enheter', data: [...relevantMine, ...relevantRest] },
  ];

  return (
    <div className="lg:overflow-auto">
      <LoadingOverlay isLoading={saksdataIsLoading || statsIsLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={mine} version={KvalitetsvurderingVersion.V1} />
          <TotalProcessed length={relevantMine.length} version={KvalitetsvurderingVersion.V1} />
          <Omgjort version={KvalitetsvurderingVersion.V1} stats={relevantMine} label="Omgjort av vår enhet" />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card span={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V1}
            title="Vår enhets omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V1_V2}
          />
        </Card>

        <Card span={4}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <TypeWarning />
          <KvalitetsvurderingerV1 stats={relevantMine} />
        </Card>

        <Card span={4}>
          <VurderingerTable data={saksdata} />
        </Card>

        <Card span={2}>
          <UtfallGraph stats={mine} title="Utfall" />
        </Card>

        <Card span={3}>
          <Hjemler stats={relevantMine} title="Hjemler" />
        </Card>
      </ChartsWrapper>
    </div>
  );
};
