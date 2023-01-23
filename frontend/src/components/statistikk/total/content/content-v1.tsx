import React from 'react';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../../../styled-components/cards';
import { ContentArea } from '../../../../styled-components/filters-and-content';
import { IFullStatisticVurderingV1 } from '../../../../types/statistics/v1';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
import { KvalitetsvurderingerV1 } from '../../charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { UtfallGraph } from '../../charts/utfall-graph';
import { Gjennomsnittstid } from '../../key-stats/average-time';
import { Finished } from '../../key-stats/finished';
import { Omgjort } from '../../key-stats/omgjort';
import { Processed } from '../../key-stats/processed';
import { ToggleTotalOrKA } from '../../toggle-ka-total';

interface Props {
  rest: IFullStatisticVurderingV1[];
  isLoading: boolean;
}

export const ContentV1 = ({ rest, isLoading }: Props) => (
  <>
    <LoadingOverlay isLoading={isLoading} />

    <ContentArea>
      <FullWidthStickyContainer>
        <StatsContainer>
          <Finished stats={rest} />
          <Omgjort stats={rest} />
          <Gjennomsnittstid stats={rest} />
          <Processed weeks={12} stats={rest} />
          <Processed weeks={15} stats={rest} />
        </StatsContainer>
      </FullWidthStickyContainer>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Omgjøringsprosent</CardTitle>
        <Omgjoeringsprosent stats={[{ label: 'Totalt', data: rest }]} />
      </DynamicCard>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitle>Kvalitetsvurderinger</CardTitle>
        <KvalitetsvurderingerV1 stats={rest} />
      </DynamicCard>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Utfall</CardTitle>
        <UtfallGraph stats={rest} />
      </DynamicCard>

      <DynamicCard size={CardSize.MEDIUM}>
        <CardTitle>Hjemler</CardTitle>
        <Hjemler stats={rest} />
      </DynamicCard>

      <DynamicCard size={CardSize.LARGE}>
        <CardTitle>Behandlingstid</CardTitle>
        <ToggleTotalOrKA />
        <BehandlingstidHistogram stats={rest} />
      </DynamicCard>

      <BehandlingstidOverTime stats={rest} />
    </ContentArea>
  </>
);
