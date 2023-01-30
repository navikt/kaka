import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useMemo } from 'react';
import { useSaksbehandlere } from '../../../../simple-api-state/use-saksbehandlere';
import { useUser } from '../../../../simple-api-state/use-user';
import { CardTitle, FullWidthStickyContainer, StatsContainer } from '../../../../styled-components/cards';
import { ContentArea } from '../../../../styled-components/filters-and-content';
import { IFullStatisticVurderingV2 } from '../../../../types/statistics/v2';
import { LoadingOverlay } from '../../../loader/overlay';
import { CardSize, DynamicCard } from '../../card/card';
import { BehandlingstidHistogram } from '../../charts/behandlingstid-histogram';
import { BehandlingstidOverTime } from '../../charts/behandlingstid-over-time';
import { Hjemler } from '../../charts/hjemler';
import { Omgjoeringsprosent } from '../../charts/omgjoeringsprosent';
import { UtfallGraph } from '../../charts/utfall-graph';
import { KvalitetsvurderingerV2 } from '../../charts/v2/kvalitetsvurderinger/kvalitetsvurderinger';
import { Gjennomsnittstid } from '../../key-stats/average-time';
import { Finished } from '../../key-stats/finished';
import { Omgjort } from '../../key-stats/omgjort';
import { Processed } from '../../key-stats/processed';
import { ToggleTotalOrKA } from '../../toggle-ka-total';

type SaksbehandlerStats = Record<string, IFullStatisticVurderingV2[]>;

interface Props {
  mine: IFullStatisticVurderingV2[];
  rest: IFullStatisticVurderingV2[];
  saksbehandlere: SaksbehandlerStats;
  isLoading: boolean;
}

export const ContentV2 = ({ mine, rest, isLoading, saksbehandlere }: Props) => {
  const { data: userData } = useUser();
  const { data: saksbehandlerList = [] } = useSaksbehandlere(userData?.ansattEnhet.id ?? skipToken);

  const saksbehandlereStats = useMemo(
    () =>
      Object.entries(saksbehandlere).map(([navIdent, stats]) => ({
        label: saksbehandlerList.find((s) => s.navIdent === navIdent)?.navn ?? 'Laster...',
        data: stats ?? [],
      })),
    [saksbehandlerList, saksbehandlere]
  );

  const datasets = [
    { label: 'Min enhet', data: mine },
    { label: 'Andre enheter', data: rest },
    { label: 'Alle enheter', data: [...mine, ...rest] },
    ...saksbehandlereStats,
  ];

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <ContentArea>
        <FullWidthStickyContainer>
          <StatsContainer>
            <Finished stats={mine} />
            <Omgjort stats={mine} />
            <Gjennomsnittstid stats={mine} />
            <Processed weeks={12} stats={mine} />
            <Processed weeks={15} stats={mine} />
          </StatsContainer>
        </FullWidthStickyContainer>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Min enhets omgjøringsprosent</CardTitle>
          <Omgjoeringsprosent stats={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Kvalitetsvurderinger</CardTitle>
          <KvalitetsvurderingerV2 datasets={datasets} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Utfall</CardTitle>
          <UtfallGraph stats={mine} />
        </DynamicCard>

        <DynamicCard size={CardSize.MEDIUM}>
          <CardTitle>Hjemler</CardTitle>
          <Hjemler stats={mine} />
        </DynamicCard>

        <DynamicCard size={CardSize.LARGE}>
          <CardTitle>Behandlingstid</CardTitle>
          <ToggleTotalOrKA />
          <BehandlingstidHistogram stats={mine} />
        </DynamicCard>

        <BehandlingstidOverTime stats={mine} />
      </ContentArea>
    </>
  );
};
