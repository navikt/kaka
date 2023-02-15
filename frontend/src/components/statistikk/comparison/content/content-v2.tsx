import React from 'react';
import { CardTitle } from '../../../../styled-components/cards';
import { ContentArea } from '../../../../styled-components/filters-and-content';
import { IComparedFullStatisticVurderingV2 } from '../../../../types/statistics/v2';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { OmgjoeringsprosentOverTime } from '../../charts/comparison/omgjoeringsprosent-over-time';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { KvalitetsvurderingerV2 } from '../../charts/v2/kvalitetsvurderinger/kvalitetsvurderinger';
import { filterIrrelevant } from '../../filters/relevant';

interface Props {
  stats: IComparedFullStatisticVurderingV2[];
  isLoading: boolean;
}

export const ContentV2 = ({ stats, isLoading }: Props) => {
  const datasets = stats.map(({ label, vurderinger }) => ({
    label,
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
          <KvalitetsvurderingerV2 datasets={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Omgjøringsprosent per uke</CardTitle>
          <OmgjoeringsprosentOverTime stats={stats} />
        </DynamicCard>
      </ContentArea>
    </>
  );
};
