import React from 'react';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../../styled-components/cards';
import { ContentArea } from '../../../styled-components/filters-and-content';
import { IStatisticVurderingV2 } from '../../../types/statistics/v2';
import { VurderingerTable } from '../../kvalitetsvurderinger/table';
import { LoadingOverlay } from '../../loader/overlay';
import { CardSize, DynamicCard } from '../../statistikk/card/card';
import { Hjemler } from '../../statistikk/charts/hjemler';
import { Omgjoeringsprosent } from '../../statistikk/charts/omgjoeringsprosent';
import { UtfallGraph } from '../../statistikk/charts/utfall-graph';
import { KvalitetsvurderingerV2 } from '../../statistikk/charts/v2/kvalitetsvurderinger/kvalitetsvurderinger';
import { Finished } from '../../statistikk/key-stats/finished';
import { Omgjort } from '../../statistikk/key-stats/omgjort';
import { TilbakemeldingerCommonProps } from '../types';

interface Props extends TilbakemeldingerCommonProps {
  mine: IStatisticVurderingV2[];
  rest: IStatisticVurderingV2[];
}

export const ContentV2 = ({ mine, rest, statsIsLoading, saksdata, saksdataIsLoading }: Props) => {
  const datasets = [
    { label: 'Vår enhet', data: mine },
    { label: 'Andres enheter', data: rest },
    { label: 'Alle enheter', data: [...mine, ...rest] },
  ];

  return (
    <>
      <LoadingOverlay isLoading={saksdataIsLoading || statsIsLoading} />

      <ContentArea>
        <FullWidthStickyContainer>
          <StatsContainer>
            <Finished stats={mine} />
            <Omgjort stats={mine} />
          </StatsContainer>
        </FullWidthStickyContainer>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Vår enhets omgjøringsprosent</CardTitle>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <KvalitetsvurderingerV2 datasets={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <VurderingerTable data={saksdata} testId="fullfoerte-vurderinger" />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <UtfallGraph stats={mine} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <Hjemler stats={mine} />
        </DynamicCard>
      </ContentArea>
    </>
  );
};