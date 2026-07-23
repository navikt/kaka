import { ChartsWrapper } from '@app/components/statistikk/card/charts-wrapper';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IStatisticVurderingV2 } from '@app/types/statistics/v2';
import { VurderingerTable } from '../../kvalitetsvurderinger/table';
import { LoadingOverlay } from '../../loader/overlay';
import { Card } from '../../statistikk/card/card';
import { Hjemler } from '../../statistikk/charts/hjemler';
import { Omgjoeringsprosent } from '../../statistikk/charts/omgjoeringsprosent';
import { UtfallGraph } from '../../statistikk/charts/utfall-graph';
import { KvalitetsvurderingerV2 } from '../../statistikk/charts/v2/kvalitetsvurderinger/kvalitetsvurderinger';
import { useRelevantStatistics } from '../../statistikk/hooks/use-relevant-statistics';
import { Finished } from '../../statistikk/key-stats/finished';
import { Omgjort } from '../../statistikk/key-stats/omgjort';
import type { TilbakemeldingerCommonProps } from '../types';

interface Props extends TilbakemeldingerCommonProps {
  mine: IStatisticVurderingV2[];
  rest: IStatisticVurderingV2[];
}

export const ContentV2 = ({ mine, rest, statsIsLoading, saksdata, saksdataIsLoading }: Props) => {
  const relevantMine = useRelevantStatistics(mine, KvalitetsvurderingVersion.V2);
  const relevantRest = useRelevantStatistics(rest, KvalitetsvurderingVersion.V2);

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
          <Finished stats={mine} version={KvalitetsvurderingVersion.V2} />
          <TotalProcessed length={relevantMine.length} version={KvalitetsvurderingVersion.V2} />
          <Omgjort version={KvalitetsvurderingVersion.V2} stats={relevantMine} label="Omgjort av vår enhet" />
        </StatsContainer>
      </FullWidthStickyContainer>

      <ChartsWrapper>
        <Card span={2}>
          <Omgjoeringsprosent
            stats={datasets}
            version={KvalitetsvurderingVersion.V2}
            title="Vår enhets omgjøringsprosent"
            helpText={OMGJORT_HELP_TEXT_V1_V2}
          />
        </Card>

        <TypeWarning />
        <KvalitetsvurderingerV2 datasets={datasets} />

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
