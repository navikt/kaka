import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT_V1_V2 } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { IStatisticVurderingV2 } from '@app/types/statistics/v2';
import { VurderingerTable } from '../../kvalitetsvurderinger/table';
import { LoadingOverlay } from '../../loader/overlay';
import { CardSize, DynamicCard } from '../../statistikk/card/card';
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
    <ContentArea>
      <LoadingOverlay isLoading={saksdataIsLoading || statsIsLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={mine} version={KvalitetsvurderingVersion.V2} />
          <TotalProcessed length={relevantMine.length} version={KvalitetsvurderingVersion.V2} />
          <Omgjort version={KvalitetsvurderingVersion.V2} stats={relevantMine} label="Omgjort av vår enhet" />
        </StatsContainer>
      </FullWidthStickyContainer>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT_V1_V2} placement="bottom">
          Vår enhets omgjøringsprosent
        </CardTitleWithExplainer>
        <Omgjoeringsprosent stats={datasets} version={KvalitetsvurderingVersion.V2} />
      </DynamicCard>

      <TypeWarning />
      <KvalitetsvurderingerV2 datasets={datasets} />

      <DynamicCard size={CardSize.LARGE}>
        <VurderingerTable data={saksdata} testId="fullfoerte-vurderinger" />
      </DynamicCard>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Utfall</CardTitle>
        <UtfallGraph stats={mine} />
      </DynamicCard>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Hjemler</CardTitle>
        <Hjemler stats={relevantMine} />
      </DynamicCard>
    </ContentArea>
  );
};
