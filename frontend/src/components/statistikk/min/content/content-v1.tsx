import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { TotalProcessed } from '@app/components/statistikk/key-stats/kvalitetsvurderte-saker';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import { IFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
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
  const relevantMine = useRelevantStatistics(mine);
  const relevantRest = useRelevantStatistics(rest);

  const behandlingstidOverTime = useBehandlingstidOverTime(relevantMine);

  const datasets = [
    { label: 'Meg', data: relevantMine },
    { label: 'Andre saksbehandlere i min enhet', data: relevantRest },
    { label: 'Alle saksbehandlere i min enhet', data: [...relevantMine, ...relevantRest] },
  ];

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <ContentArea>
        <FullWidthStickyContainer>
          <StatsContainer>
            <Finished stats={mine} />
            <TotalProcessed length={relevantMine.length} />
            <Omgjort stats={relevantMine} label="Omgjort av meg" />
            <Gjennomsnittstid stats={relevantMine} />
            <Processed weeks={12} stats={relevantMine} />
            <Processed weeks={15} stats={relevantMine} />
          </StatsContainer>
        </FullWidthStickyContainer>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT} placement="bottom">
            Min omgjøringsprosent
          </CardTitleWithExplainer>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <KvalitetsvurderingerV1 stats={relevantMine} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <UtfallGraph stats={relevantMine} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <Hjemler stats={relevantMine} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Behandlingstid</CardTitle>
          <ToggleTotalOrKA />
          <BehandlingstidHistogram stats={relevantMine} />
        </DynamicCard>

        <BehandlingstidOverTime stats={behandlingstidOverTime} />
      </ContentArea>
    </>
  );
};
