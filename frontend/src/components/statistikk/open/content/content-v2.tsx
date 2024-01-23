import React from 'react';
import { CardTitleWithExplainer } from '@app/components/statistikk/charts/kvalitetsvurderinger/explainer';
import { OMGJORT_HELP_TEXT } from '@app/components/statistikk/texts';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import { IStatisticVurderingV2 } from '@app/types/statistics/v2';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
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
  stats: IStatisticVurderingV2[];
  isLoading: boolean;
}

export const ContentV2 = ({ stats, isLoading }: Props) => {
  const relevantStats = useRelevantStatistics(stats);
  const behandlingstidOverTime = useBehandlingstidOverTime(relevantStats);

  const datasets = [{ label: 'Totalt', data: relevantStats }];

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <ContentArea>
        <FullWidthStickyContainer>
          <StatsContainer>
            <Finished stats={stats} />
            <Omgjort stats={relevantStats} label="Omgjort av klageinstansen" />
            <Gjennomsnittstid stats={relevantStats} />
            <Processed weeks={12} stats={relevantStats} />
            <Processed weeks={15} stats={relevantStats} />
          </StatsContainer>
        </FullWidthStickyContainer>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitleWithExplainer helpText={OMGJORT_HELP_TEXT} placement="bottom">
            Omgjøringsprosent
          </CardTitleWithExplainer>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <KvalitetsvurderingerV2 datasets={datasets} />

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <UtfallGraph stats={relevantStats} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <Hjemler stats={relevantStats} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Behandlingstid</CardTitle>
          <ToggleTotalOrKA />
          <BehandlingstidHistogram stats={relevantStats} />
        </DynamicCard>

        <BehandlingstidOverTime stats={behandlingstidOverTime} />
      </ContentArea>
    </>
  );
};
