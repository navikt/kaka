import { LoadingOverlay } from '@app/components/loader/overlay';
import { BehandlingstidHistogram } from '@app/components/statistikk/charts/behandlingstid-histogram';
import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { TypeWarning } from '@app/components/statistikk/type-warning';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import type { IFullStatisticVurderingV2 } from '@app/types/statistics/v2';
import { CardSize, DynamicCard } from '../../card/card';
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

interface Props {
  rest: IFullStatisticVurderingV2[];
  isLoading: boolean;
}

export const ContentV2 = ({ rest, isLoading }: Props) => {
  const relevantRest = useRelevantStatistics(rest);
  const behandlingstidOverTime = useBehandlingstidOverTime(relevantRest);

  const datasets = [{ label: 'Totalt', data: relevantRest }];

  return (
    <ContentArea>
      <LoadingOverlay isLoading={isLoading} />

      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={rest} />
          <TotalProcessed length={relevantRest.length} />
          <Omgjort stats={relevantRest} label="Omgjort av klageinstansen" />
          <Gjennomsnittstid stats={relevantRest} />
          <Processed weeks={12} stats={relevantRest} />
          <Processed weeks={15} stats={relevantRest} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT} placement="bottom">
          Omgjøringsprosent
        </CardTitleWithExplainer>
        <Omgjoeringsprosent stats={datasets} />
      </DynamicCard>

      <TypeWarning />
      <KvalitetsvurderingerV2 datasets={datasets} />

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Utfall</CardTitle>
        <UtfallGraph stats={rest} />
      </DynamicCard>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Hjemler</CardTitle>
        <Hjemler stats={relevantRest} />
      </DynamicCard>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitle>Behandlingstid</CardTitle>
        <ToggleTotalOrKA />
        <BehandlingstidHistogram stats={relevantRest} />
      </DynamicCard>

      <BehandlingstidOverTime stats={behandlingstidOverTime} />
    </ContentArea>
  );
};
