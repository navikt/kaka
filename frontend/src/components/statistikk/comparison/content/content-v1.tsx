import React from 'react';
import { CardTitle } from '@app/styled-components/cards';
import { ContentArea } from '@app/styled-components/filters-and-content';
import { IComparedFullStatisticVurderingV1 } from '@app/types/statistics/v1';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidComparison } from '../../charts/comparison/behandlingstid';
import { BehandlingstidOverTime } from '../../charts/comparison/behandlingstid-over-time';
import { OmgjoeringsprosentOverTime } from '../../charts/comparison/omgjoeringsprosent-over-time';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { filterIrrelevant } from '../../filters/relevant';

interface Props {
  stats: IComparedFullStatisticVurderingV1[];
  isLoading: boolean;
}

export const ContentV1 = ({ stats, isLoading }: Props) => {
  const datasets = stats.map(({ label, vurderinger, color }) => ({
    label,
    color,
    data: filterIrrelevant(vurderinger),
  }));

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <ContentArea>
        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Omgjøringsprosent</CardTitle>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Omgjøringsprosent per uke</CardTitle>
          <OmgjoeringsprosentOverTime stats={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Gjennomsnittlig behandlingstid</CardTitle>
          <BehandlingstidComparison stats={datasets} />
        </DynamicCard>

        <BehandlingstidOverTime datasets={datasets} />
      </ContentArea>
    </>
  );
};
