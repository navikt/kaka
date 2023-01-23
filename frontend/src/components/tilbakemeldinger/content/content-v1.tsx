import React from 'react';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../../styled-components/cards';
import { ContentArea } from '../../../styled-components/filters-and-content';
import { IStatisticVurderingV1 } from '../../../types/statistics/v1';
import { VurderingerTable } from '../../kvalitetsvurderinger/table';
import { LoadingOverlay } from '../../loader/overlay';
import { CardSize, DynamicCard } from '../../statistikk/card/card';
import { Hjemler } from '../../statistikk/charts/hjemler';
import { KvalitetsvurderingerV1 } from '../../statistikk/charts/kvalitetsvurderinger/kvalitetsvurderinger';
import { Omgjoeringsprosent } from '../../statistikk/charts/omgjoeringsprosent';
import { UtfallGraph } from '../../statistikk/charts/utfall-graph';
import { Finished } from '../../statistikk/key-stats/finished';
import { Omgjort } from '../../statistikk/key-stats/omgjort';
import { TilbakemeldingerCommonProps } from '../types';

interface Props extends TilbakemeldingerCommonProps {
  mine: IStatisticVurderingV1[];
  rest: IStatisticVurderingV1[];
}

export const ContentV1 = ({ mine, rest, statsIsLoading, saksdata, saksdataIsLoading }: Props) => {
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
          <KvalitetsvurderingerV1 stats={mine} />
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
