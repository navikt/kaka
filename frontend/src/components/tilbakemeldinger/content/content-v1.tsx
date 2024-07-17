import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import { IStatisticVurderingV1 } from '@app/types/statistics/v1';
import { VurderingerTable } from '../../kvalitetsvurderinger/table';
import { LoadingOverlay } from '../../loader/overlay';
import { CardSize, DynamicCard } from '../../statistikk/card/card';
import { Hjemler } from '../../statistikk/charts/hjemler';
import { KvalitetsvurderingerV1 } from '../../statistikk/charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { Omgjoeringsprosent } from '../../statistikk/charts/omgjoeringsprosent';
import { UtfallGraph } from '../../statistikk/charts/utfall-graph';
import { useRelevantStatistics } from '../../statistikk/hooks/use-relevant-statistics';
import { Finished } from '../../statistikk/key-stats/finished';
import { Omgjort } from '../../statistikk/key-stats/omgjort';
import { TilbakemeldingerCommonProps } from '../types';

interface Props extends TilbakemeldingerCommonProps {
  mine: IStatisticVurderingV1[];
  rest: IStatisticVurderingV1[];
}

export const ContentV1 = ({ mine, rest, statsIsLoading, saksdata, saksdataIsLoading }: Props) => {
  const relevantMine = useRelevantStatistics(mine);
  const relevantRest = useRelevantStatistics(rest);

  const datasets = [
    { label: 'Vår enhet', data: relevantMine },
    { label: 'Andres enheter', data: relevantRest },
    { label: 'Alle enheter', data: [...relevantMine, ...relevantRest] },
  ];

  return (
    <>
      <LoadingOverlay isLoading={saksdataIsLoading || statsIsLoading} />

      <ContentArea>
        <FullWidthStickyContainer>
          <StatsContainer>
            <Finished stats={mine} />
            <TotalProcessed length={relevantMine.length} />
            <Omgjort stats={relevantMine} label="Omgjort av vår enhet" />
          </StatsContainer>
        </FullWidthStickyContainer>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT} placement="bottom">
            Vår enhets omgjøringsprosent
          </CardTitleWithExplainer>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <KvalitetsvurderingerV1 stats={relevantMine} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <VurderingerTable data={saksdata} testId="fullfoerte-vurderinger" />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <UtfallGraph stats={relevantMine} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <Hjemler stats={relevantMine} />
        </DynamicCard>
      </ContentArea>
    </>
  );
};
